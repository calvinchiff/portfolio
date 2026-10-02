# Déploiement — Raspberry Pi

## Comment ça marche

```
push sur main  →  GitHub Actions construit l'image arm64  →  push sur GHCR
               →  SSH vers le Pi (via Tailscale)          →  remplace le conteneur `portfolio`
```

Workflow : `.github/workflows/deploy.yml`. Le build part de `next.config.js`
(`output: 'standalone'`) et le `.dockerignore` évite d'envoyer `.git`, `.next`,
`out/` et `node_modules` comme contexte de build.

**Rien ne tourne en permanence sur le Pi pour écouter** : il est purement passif.
C'est le runner GitHub qui se connecte à lui en SSH et lance les commandes Docker.

## ⚠️ Le nom de l'image suit le nom du dépôt

L'image est `ghcr.io/<owner>/<repo>`, calculée à l'exécution depuis
`github.repository`. Ici : **`ghcr.io/calvinchiff/portfolio`**.

Si tu renommes le dépôt, le nom de l'image change **avec lui**, mais les images
déjà téléchargées sur le Pi gardent l'ancien nom. C'est exactement ce qui a mis
le site par terre au renommage `portfolio-2025` → `portfolio` : le script a
supprimé le conteneur, puis n'a pas trouvé `…/portfolio:latest` localement et le
pull a été refusé. En cas de renommage, vérifie le nom du paquet dans
GitHub → profil → *Packages*, et pense à mettre à jour le tag utilisé sur le Pi.

## Images poussées

| Événement | Tags poussés | Déploiement |
| --- | --- | --- |
| push sur `main` | `:main`, `:sha-<sha>`, `:latest` | oui, sur le Pi |
| push d'un tag `v*` | `:v2.0.0`, `:sha-<sha>` | **non** |

Pousser un tag construit donc une image **versionnée** sans toucher au Pi : une
version passée reste redéployable sans rien reconstruire.

## Revenir à une version antérieure

Le code est dans git, les images sont versionnées : les deux voies fonctionnent.

```bash
# 1) revenir au code, sur une branche de correctif
git switch -c hotfix/v1 v1.0.0

# 2) ou redéployer directement l'image déjà construite, sur le Pi
ssh <PI_USER_HOST> -p <PI_PORT>
docker pull ghcr.io/calvinchiff/portfolio:v1.0.0
docker rm -f portfolio
docker run -d --name portfolio --restart always -p 3000:3000 \
  ghcr.io/calvinchiff/portfolio:v1.0.0
```

Le déploiement automatique garde la version en cours sous le nom
`portfolio_prev` jusqu'à ce que la nouvelle réponde. Si elle ne répond pas
après 60 s, il la restaure et fait échouer le run — un mauvais build ne peut plus
laisser le site par terre.

## Le jeton GHCR (celui qui expire)

Le workflow **pousse** avec le `GITHUB_TOKEN` automatique : aucun PAT n'est requis
pour publier. Un PAT `read:packages` ne sert qu'à **tirer** l'image sur le Pi, et
**seulement si le paquet GHCR est privé** (c'est le cas par défaut).

Deux options :

- **Recommandé — rendre le paquet public.** GitHub → profil → *Packages* →
  `portfolio` → *Package settings* → *Change visibility* → **Public**.
  Puis sur le Pi : **`docker logout ghcr.io`**. C'est indispensable : si un ancien
  jeton reste stocké, Docker l'envoie quand même, le registre répond `denied` et
  il **ne retombe pas** sur l'accès anonyme — même pour un paquet public. Après le
  logout : plus aucun jeton, plus d'expiration, et l'image ne contient que des
  fichiers déjà publics.
- **Garder privé.** Créer un jeton (*fine-grained* avec *Packages: read*, ou
  classique `read:packages`), copier sa valeur **tout de suite** (elle n'est
  affichée qu'une fois), faire `docker login ghcr.io -u calvinchiff` sur le Pi
  **avec l'utilisateur qui lance les commandes Docker**, vérifier un
  `docker pull`, révoquer l'ancien, et noter la date d'expiration.

Régénérer un jeton crée une **nouvelle valeur** : l'ancienne est invalidée
immédiatement, et il faut donc refaire le `docker login` sur le Pi. Sans ça, le
`docker pull` du Pi renvoie `denied` et plus aucun déploiement ne passe.

## Secrets du dépôt

Settings → Secrets and variables → Actions :

| Secret | Rôle |
| --- | --- |
| `TS_OAUTH_CLIENT_ID`, `TS_OAUTH_SECRET` | rejoindre le tailnet depuis la CI |
| `SSH_PRIVATE_KEY` | clé SSH vers le Pi |
| `PI_PORT`, `PI_USER_HOST` | cible SSH |

Ces cinq secrets servent au trajet **CI → Pi**. Le jeton GHCR sert au trajet
**Pi → GitHub** (télécharger l'image) : ce sont deux authentifications
différentes, pour deux machines et deux services différents.

## Nettoyage des images

À chaque déploiement : les couches non étiquetées sont supprimées, et seules les
**5** dernières images `sha-*` de ce dépôt sont conservées. Les images des autres
conteneurs du Pi ne sont jamais touchées.

## Si le build arm64 plante sous QEMU

Le runner GitHub est en x64 : produire une image arm64 se fait par émulation
QEMU, et `npm ci` peut y mourir avec :

```text
qemu: uncaught target signal 4 (Illegal instruction) - core dumped
```

Ce n'est pas le code du site, c'est l'émulation. C'est pour ça que le Dockerfile
part de `node:20-bookworm-slim` (glibc) et non d'`alpine` (musl) : la toolchain
musl est la cause connue de ce plantage.

Si ça recommence, deux issues :

1. **Construire sur le Pi** (le plus fiable) : il est arm64, donc aucun émulateur
   n'est nécessaire. Le workflow ne fait alors plus de `docker build` sur le
   runner mais un `git pull && docker build` en SSH sur le Pi.
2. **Construire sans émulation** : mettre l'étage de build en
   `FROM --platform=$BUILDPLATFORM node:20-bookworm-slim` pour qu'il tourne
   nativement sur le runner. Attention alors à `sharp` (dépendance native tirée
   par Next) : il faut aussi le binaire arm64 dans l'étage de build, sinon
   l'optimisation d'images casse à l'exécution.

