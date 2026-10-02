# TODO — Portfolio Calvin Chiffot

Suivi des fonctionnalités à implémenter, **directement dans le repo** (remplace Trello et
autres outils externes).

## Convention

- `- [ ]` à faire · `- [x]` fait
- Un item terminé est **déplacé** dans « ✅ Terminé » avec la **date** et le **commit**.
- Un item commencé passe dans « 🚧 En cours » (un seul à la fois si possible).
- Chaque item a un identifiant `TODO-XX` pour pouvoir le référencer dans les commits
  (ex. `git commit -m "TODO-08: compteur projets"`).
- On garde le contexte utile (fichiers, pistes) sous chaque item pour ne pas le rechercher.

---

## 🔥 Prioritaire

- [ ] **TODO-01 — CV LaTeX : ajouter le téléchargement des sources `.tex`**
  - Les sources existent déjà : `public/contact/en_CV_CHIFFOT.tex`, `public/contact/fr_CV_CHIFFOT.tex` (commit `ba73cd0`).
  - Aujourd'hui la tuile CV (`app/components/sections/ContactSection.tsx`, ~l.77-96) ouvre seulement le PDF via `window.open`.
  - À faire : proposer le téléchargement du `.tex` de la langue courante (attribut `download`, ou petite tuile/icône dédiée), et vérifier que le fichier est bien servi par Next.

- [ ] **TODO-03 — Mettre à jour le background (direction finale)**
  - Passé en nuances de gris foncé (commit `d6fc0d6`) ; anciennes valeurs sauvegardées dans `bg-colors-backup.txt`.
  - Reste : valider la direction définitive (intensité, contraste avec les tuiles) et le réglage du mouvement (TODO-04, ✅ implémenté).

- [ ] **TODO-05 — Intégrer le contenu du board Trello** ⏳ *en attente de l'export*
  - Le fichier fourni (`portfolio.json`, 64 Ko) est en réalité la **coquille d'erreur de Trello** (« To use Trello, please enable JavaScript ») : il ne contient **aucune carte**.
  - À fournir : export JSON du board (menu du board → *Partager, imprimer et exporter* → **Exporter en JSON**), ou la liste des cartes collée dans le chat.
  - Une fois l'export en main : transformer chaque carte en item de ce fichier (et/ou en entrée de `public/data/projectsData.tsx` pour les projets).

---

## 📋 À faire

- [ ] **TODO-06 — Ajouter des projets dans la partie Projets**
  - Données : `public/data/projectsData.tsx` — deux catégories : `projects.dev` et `projects.craft` (l.10 et l.53), plus `contentTitles` pour les libellés de champs.
  - Chaque entrée porte un `id`, un `title` bilingue `{ en, fr }` et des champs optionnels affichés automatiquement.

- [ ] **TODO-07 — Mettre à jour et réécrire les textes**
  - Fichiers de contenu : `public/data/` → `generalData.tsx`, `skillsData.tsx`, `careerData.tsx`, `projectsData.tsx`, `contactData.tsx`, `footerData.tsx`, `navbarData.tsx`.
  - Garder **EN et FR synchronisés** (le site bascule via `app/utils/LanguageContext.tsx`).

- [ ] **TODO-08 — Partie Projets : curseur « projet X sur N »**
  - `app/components/sections/ProjectsSection.tsx` expose déjà `projectIndex` et `currentProjects.length`.
  - À ajouter : indicateur visible (compteur `X / N`, points ou barre), remis à zéro au changement de catégorie (`useEffect` existant l.21-23).

- [ ] **TODO-09 — Partie Projets : tuiles latérales qui défilent et prennent la place au centre (ou animation)**
  - Pattern existant à réutiliser : `app/components/ui/Section.tsx` → `renderInvisGrid()` (tuiles latérales floutées, masquées par dégradé).
  - Objectif : faire « entrer » le projet suivant depuis le côté vers la tuile centrale (slide + fondu), avec `prefers-reduced-motion` en repli.

- [ ] **TODO-10 — Corriger les CV LaTeX**
  - Fichiers : `public/contact/en_CV_CHIFFOT.tex`, `public/contact/fr_CV_CHIFFOT.tex`.
  - Corriger le contenu, compiler, puis régénérer les PDF servis : `public/contact/en-CV-CHIFFOT_Calvin.pdf`, `public/contact/fr-CV-CHIFFOT_Calvin.pdf`.

---

## 🗂️ Cartes du board Trello — import du 2026-10-01

> Reprises de la capture du board. Colonne « En cours » : aucune carte visible sur la capture.
> **Non dupliquées** car déjà présentes : « CRT Style » → `TODO-02`,
> « Animation sliding project appearing from the right replacing the previous one » → `TODO-09`.

### Colonne « Backlog »

- [ ] **TODO-11 — Animation de chargement « computer like »**
  - Séquence voulue : d'abord le fond qui se dessine (traits), puis les tuiles qui se chargent, puis le contenu.
  - Piste : orchestrer via framer-motion (`app/utils/AnimatedWrapper.tsx` existe déjà) + un état « ready » qui retarde l'apparition des tuiles.

- [ ] **TODO-12 — Mise à jour auto depuis GitHub quand le README d'un projet public change**
  - Objectif : au build/déploiement, récupérer automatiquement les infos des repos publics.
  - Piste : script de fetch (GitHub API) en pré-build, ou revalidation côté serveur ; un `postbuild` existe déjà (`next-sitemap`).

- [ ] **TODO-13 — V2 : sections entières affichées à l'arrivée, clic pour zoomer dans la section**
  - Vue d'ensemble de toutes les sections, puis zoom sur celle qui est cliquée.

- [ ] **TODO-14 — Bordures qui apparaissent au mouvement de la souris autour des tuiles**
  - Aujourd'hui la bordure est fixe : `border-white/10` dans `app/components/ui/BGTile.tsx`.
  - Piste : bordure/glow qui suit le curseur (variables CSS `--x`/`--y` + `radial-gradient` en `background-clip`).

- [ ] **TODO-15 — ThreeJS pour des modèles 3D dans les projets ou les images**
  - ⚠️ `three` a été retiré des dépendances (il servait à l'ancien `BGTopo.tsx`) → à réinstaller si retenu.

- [ ] **TODO-16 — Utiliser des SVG comme 1chooo pour les compétences**
  - Visuels de `app/components/sections/SkillsSection.tsx` + données `public/data/skillsData.tsx`.

- [ ] **TODO-17 — Faire défiler les compétences comme 1chooo**
  - Marquee / carrousel des skills.

### Colonne « Conception »

- [ ] **TODO-18 — Bug : quand une section disparaît progressivement hors écran, le blur derrière le fond ne fonctionne pas**
- [ ] **TODO-19 — Corriger les bordures floutées**
- [ ] **TODO-20 — Ajouter un bruit comme sur motion.dev (`/docs/react-gestures`), sauf si le CRT suffit**
  - Note : le fond possède déjà deux couches de grain (`app/components/ui/BGDepth.tsx`, commit `0958a13`) — à préciser si c'est suffisant.
- [ ] **TODO-21 — Page blog (ouverte depuis « more » dans la tuile « me ») fermable avec une croix**
- [ ] **TODO-22 — Une planète qui montre où j'en suis, comme 1chooo.com**
  - Les orbites/planètes existent déjà (`925b076`) ; il s'agit ici d'un **indicateur de section courante**.
- [ ] **TODO-23 — Livres et articles lus et trouvés intéressants**
- [ ] **TODO-24 — Historique des commits git**
- [ ] **TODO-25 — Vue projet : vue simple (infos de base + description) + bouton « see more » ouvrant le projet en pleine page**
  - Alternative notée sur la carte : « wrap around the data if not a lot of info for project ».
- [ ] **TODO-26 — Ajouter des images aux projets**
- [ ] **TODO-27 — Site en SSG / optimiser le chargement**
- [ ] **TODO-28 — Bug : opacité des tuiles sur mobile**
- [ ] **TODO-29 — Progression automatique à l'affichage**
- [ ] **TODO-30 — Bug : ça lague au scroll, des parties disparaissent**

### Colonne « À faire »

- [ ] **TODO-31 — Bug : clic trop rapide sur le changement de texte**
- [ ] **TODO-32 — Au clic sur un projet, ouvrir le lien GitHub**
- [ ] **TODO-33 — Ajouter du monitoring (perf, uptime, vitesse, latence, etc.)**

---

## 🚧 En cours

*(rien pour le moment — déplacer ici l'item sur lequel on travaille)*

---

## ✅ Terminé

- [x] **2026-10-01 — Background passé en nuances de gris foncé + tuiles gris plus clair** — `d6fc0d6`
  - `BGDepth.tsx` : palette bijou → `GRAY_DEEP/COOL/MID/WARM`, base `#0b0b0c`, glows et vignettes neutralisés, grains désaturés.
  - `BGTile.tsx` : `rgb(52,52,52)` → `rgb(70,71,75)` + bordure `border-white/10`.
  - `globals.css` : planètes, lune et anneaux neutralisés ; fond de page aligné.
  - Vérifié : `tsc --noEmit` = 0 ; contraste tuile/champ 1,41–1,86:1 ; texte blanc/tuile 9,88:1.
- [x] **2026-10-01 — Sauvegarde des couleurs du background précédent** — `d6fc0d6`
  - `bg-colors-backup.txt` : valeurs avant/après + mesures de contraste + commandes de restauration.
- [x] **2026-10-01 — Sources LaTeX des CV ajoutées au repo** — `ba73cd0`
  - `public/contact/en_CV_CHIFFOT.tex`, `public/contact/fr_CV_CHIFFOT.tex` (le correctif reste TODO-10).
- [x] **2026-10-02 — Effet parallax sur le background (v2 : il était imperceptible)** — *(non committé)*
  - v1 : `translate3d` mais seulement 16/36/54 px, déplacement lu via un listener `scroll` → invisible en pratique.
  - v2 : le scroll est **lu à chaque frame** (le scroller est `<main>`, et les events `scroll` ne bubblent pas) et les amplitudes sont exprimées en **fraction de la hauteur de viewport** : `field` 3,5 %, `glows` 9 %, `orbits` 13 % au scroll ; 1,2 % / 3 % / 4,5 % à la souris.
  - La souris déplace les plans même sans scroller ; `prefers-reduced-motion` garde une version amortie (35 %) au lieu de tout couper.
  - Une seule boucle rAF, écriture du `transform` uniquement si le déplacement dépasse 0,05 px.
  - Réglages regroupés dans la constante `PARALLAX` en haut de `BGDepth.tsx`.
  - **Vérifié dans le navigateur** : −28 / −72 / −105 px (v2).
  - v3 (2026-10-02) : amplitude augmentée (~+45 %). Sens d'abord inversé, puis **re-remis dans le sens d'origine** (les plans remontent quand on descend) → `field` 5 %, `glows` 13 %, `orbits` 19 %, soit **−40 / −104 / −152 px** en bas de page. Le canvas reste à `scale-[1.2]` pour que le tirage n'expose jamais son bord.
  - Réponse à la souris **réduite deux fois** (2026-10-02) : `pointer` 0,6 % / 1,5 % / 2,25 %, soit ±5,4 / ±13,5 / ±20,2 px sur 900 px de haut — mesuré au navigateur. Le scroll n'a pas été touché.
- [x] **2026-10-02 — Courbure d'écran extraite dans son propre composant (`ScreenCurve`)** — *(non committé)*
  - **Bug réparé au passage** : une version intermédiaire posait `background: #0b0b0c` sur le conteneur CRT ; ce fond opaque passait par-dessus le `BGDepth` (en `z-index: -10`) → background et cercles invisibles. Plus aucun fond opaque.
  - `app/components/ui/ScreenCurve.tsx` : distorsion en barillet **indépendante du CRT** — on peut retirer l'un sans l'autre dans `app/layout.tsx`.
  - Filtre SVG `feDisplacementMap` alimenté par `app/components/ui/crtBarrelMap.ts` (carte 128×128 générée : R = offset X, G = offset Y, 128 = neutre). Le centre reste quasi intact, les bords sont tirés vers l'extérieur → les lignes droites se bombent, comme sur un tube convexe.
  - Deux détails le font marcher : `colorInterpolationFilters="sRGB"` (sinon le 128 neutre est remappé et toute la page se décale) et un overscan `scale(1.08)` avec région de filtre à 112 %, sinon des trous apparaissent aux bords.
  - Réglages : `BARREL` (coupe tout), `BARREL_SCALE` = **68** (px max au coin ; monté 48 → 56 → 68 au fil des essais) et `OVERSCAN` = 1.09 (doit couvrir `BARREL_SCALE / 2` de tirage vertical).
  - **Vérifié dans Brave headless via CDP** : filtre appliqué, background visible, aucun trou aux bords, nav fixe au scroll. Coût mesuré : **53 fps avec le filtre contre 60 sans** en scroll continu (rendu logiciel → pessimiste), à surveiller avec `TODO-30`.
- [x] **2026-10-02 — CRT recentré sur l'effet pixel, tilt sorti dans `ScreenTilt` (TODO-02 tranché)** — *(non committé)*
  - `CRTFilter.tsx` ne contient plus que la texture : scanlines 2 px + sous-pixels RVB 3 px (`background-size: 100% 2px, 3px 100%`), **entièrement statique** — c'est l'« effet de pixels visibles ».
  - **Retiré** : l'animation `flicker` (l'overlay sombre qui pulsait toutes les 0,15 s et faisait disparaître/réapparaître la moitié du contenu) et l'animation `text-shadow` (le grésillement). Vérifié : `animationName: none` sur `.crt-container` et `.crt-screen`, et le pseudo-élément `::after` n'existe plus.
  - **Retiré aussi** : le `overflow: hidden` + `border-radius: 20px` du CRT — il ne clippe plus rien, c'est devenu un simple calque de texture posé au-dessus du contenu.
  - `app/components/ui/ScreenTilt.tsx` (nouveau) : le tilt `perspective(800px) rotateX(2deg)` isolé, avec son propre `TILT`.
  - Les trois effets vivent maintenant dans trois fichiers séparés, imbriqués dans `app/layout.tsx` (courbure → tilt → pixels) et retirables un par un.
  - **Vérifié dans Brave headless via CDP** : les 3 effets présents et indépendants, background visible, plus aucune animation CRT (ne restent que les `orbit-spin` du fond).
- [x] **2026-10-02 — Tilt retiré du montage, parallax re-remis dans le sens d'origine** — *(non committé)*
  - `ScreenTilt` n'est plus importé ni monté dans `app/layout.tsx` ; `app/components/ui/ScreenTilt.tsx` reste sur le disque (non utilisé) pour pouvoir le remettre en une ligne — à supprimer si tu confirmes que le tilt ne revient pas.
  - Parallax : sens d'origine restauré (les plans **remontent** quand on descend), amplitude augmentée conservée → mesuré **−40 / −104 / −152 px** en bas de page, sans trou au bord.
  - **Vérifié dans Brave headless :** tilt absent (`.screen-tilt` inexistant), courbure + pixels actifs, background visible, aucune animation CRT, footer et cercles intacts en bas de page.
- [x] **2026-10-02 — CI / déploiement Raspberry Pi durci** (branche `chore/raspi-deploy-hardening`) — *(à committer)*
  - **Images versionnées** : sur `main` → `:main`, `:sha-<sha>`, `:latest` ; sur un tag `v*` → `:vX.Y.Z` + `:sha-<sha>` **sans déploiement**. Une version passée reste donc redéployable sans rien reconstruire.
  - **Déploiement sans coupure** : l'ancien conteneur est renommé `portfolio_prev`, la nouvelle version est sondée pendant 60 s, et en cas d'échec l'ancienne est restaurée automatiquement (le run échoue).
  - **`.dockerignore` ajouté** : `.git`, `.next`, `out/`, `node_modules`, notes… ne partent plus dans le contexte de build.
  - **Nettoyage borné** : couches non étiquetées + seules les 5 dernières images `sha-*` de ce dépôt ; les images des autres conteneurs du Pi sont laissées tranquilles.
  - **`DEPLOY.md`** documente le tout, dont le jeton GHCR et les deux options (paquet public, ou jeton renouvelé).
  - Validé : YAML parsé, logique de tags simulée (`main` → 3 tags, tag → 2 tags sans `latest`), syntaxe bash du script de déploiement, logique de nettoyage testée sur données factices.

---

## ⏳ En attente / bloqué

- **TODO-05** : export JSON du board Trello introuvable dans le fichier fourni (voir l'item).

---

## 🧭 Annexe — Historique des backgrounds (tout est récupérable)

Rien n'a été supprimé : chaque version est dans l'historique git.

| Version | Fichier | Où la récupérer |
| --- | --- | --- |
| 1. Image + parallax (le tout premier) | `public/background.png` + `app/components/parallax.tsx` (simple ré-export de `react-scroll-parallax`) | `public/background.png` **est toujours dans le repo** ; le shim à `a69e005` |
| 2. Topographique WebGL (three.js) | `app/components/ui/BGTopo.tsx` (ex-`BG.tsx`) | `git show 16218c9:app/components/ui/BGTopo.tsx` |
| 3. Champ de couleurs canvas | `app/components/ui/BGDepth.tsx` | versions successives : `e01cea0` → `0958a13` → `925b076` |
| 3b. Couleurs bijou d'origine (avant le gris) | `app/components/ui/BGDepth.tsx` @ `925b076` | `git show 925b076:app/components/ui/BGDepth.tsx` |
| 3c. Version grise actuelle | `app/components/ui/BGDepth.tsx` | `d6fc0d6` |

Restaurer une ancienne version :

```bash
# Ancien fond coloré (bijou) de BGDepth
git show 925b076:app/components/ui/BGDepth.tsx > app/components/ui/BGDepth.tsx
git show 925b076:app/globals.css > app/globals.css          # + BGTile.tsx au besoin

# Ancien fond topographique three.js
git show 16218c9:app/components/ui/BGTopo.tsx > app/components/ui/BGTopo.tsx
```

> Pour revenir aux couleurs exactes d'avant sans toucher au code : tout est documenté dans
> `bg-colors-backup.txt`.

---

## 📝 Journal

| Date | Item | Commit |
| --- | --- | --- |
| 2026-10-01 | Background gris + sauvegarde des anciennes couleurs | `d6fc0d6` |
| 2026-10-01 | Sources LaTeX des CV | `ba73cd0` |
| 2026-10-01 | Cartes du board Trello importées dans ce fichier (TODO-11 → TODO-33) | *(non committé)* |
| 2026-10-01 | Filtre CRT réactivé pour évaluation (TODO-02) | *(non committé)* |
| 2026-10-01 | Effet parallax du background (TODO-04) | *(non committé)* |
| 2026-10-02 | Parallax v2 : amplitudes en % de viewport, scroll lu à chaque frame | *(non committé)* |
| 2026-10-02 | CRT refait : grésillement + inclinaison retirés, arrondi « vieille TV » | *(non committé)* |
| 2026-10-02 | CRT v3 : vraie courbure `feDisplacementMap` + fond opaque qui masquait le background réparé | *(non committé)* |
| 2026-10-02 | Vérification navigateur (Brave headless + CDP) : rendu, parallax, FPS | *(non committé)* |
| 2026-10-02 | Courbure extraite dans `ScreenCurve`, CRT remis en version d'origine | *(non committé)* |
| 2026-10-02 | Parallax v3 : sens inversé, amplitude +45 % | *(non committé)* |
| 2026-10-02 | CRT = grille de pixels statique (flicker + text-shadow retirés), tilt extrait dans `ScreenTilt` | *(non committé)* |
| 2026-10-02 | Tilt retiré du montage, parallax re-remis dans le sens d'origine | *(non committé)* |
