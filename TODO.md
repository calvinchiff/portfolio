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

- [ ] **TODO-02 — Tester de remettre le filtre CRT, ou sinon en développer un nouveau plus efficient**
  - Le composant existe : `app/components/ui/CRTFilter.tsx`, mais il est **commenté** dans `app/layout.tsx` (l.8, l.56, l.62).
  - **Raison historique trouvée dans git** : commit `5c60484` — *« feat: crt filter but unused as it uses too much gpu »*. Il avait donc été désactivé pour son coût GPU.
  - **Réactivé le 2026-10-01** pour évaluation visuelle (voir Journal) ; à désactiver en commentant l'import + les balises dans `app/layout.tsx`.
  - Étape 1 : le réactiver et juger le rendu (scanlines + flicker + aberration).
  - Étape 2 : mesurer le coût réel. Points chauds : `animation: textShadow 1.6s infinite` et `flicker 0.15s infinite` appliqués à un conteneur plein écran, plus le `transform: perspective(800px) rotateX(2deg)`.
  - Si trop lourd : refaire une version « efficiente » (overlay statique + grain, pas d'animation de `text-shadow` sur toute la page, respect de `prefers-reduced-motion`, éventuellement en `background` plutôt qu'en `filter`).

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

- **TODO-02 — Filtre CRT** : réactivé pour évaluation (fiche détaillée en 🔥 Prioritaire).
  → À trancher après visualisation : le garder tel quel, ou le refaire en version efficiente.

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
- [x] **2026-10-01 — Effet parallax sur le background** — *(non committé)*
  - `BGDepth.tsx` : trois plans parallax (champ de couleur, glows, système orbital) déplacés en `translate3d` par le **scroll** et par la **souris**.
  - Une seule boucle rAF qui lisse les cibles, et n'écrit le `transform` que lorsque la valeur a bougé (> 0,05 px) ; `prefers-reduced-motion` respecté.
  - Réglages regroupés dans la constante `PARALLAX` (px au scroll / px à la souris) : `field` 16/5, `glows` 36/12, `orbits` 54/16 — faciles à ajuster.
  - Le scroll est lu en **phase de capture** : la page défile dans `<main>`, pas dans la fenêtre.
  - Chaque plan est dans un wrapper `will-change-transform` ; seuls les conteneurs bougent, jamais un wrapper `.orbit`, donc les anneaux restent centrés entre eux.

- [x] **2026-10-01 — Filtre CRT réactivé (étape 1 de TODO-02)** — *(non committé)*
  - `app/layout.tsx` : import décommenté et `<CRTFilter>` replacé autour de `AnalyticsWrapper` (il englobait à l'origine le contenu + le fond).
  - Réactivé **tel quel** pour juger le rendu ; la décision (garder / refaire) reste ouverte dans TODO-02.

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
