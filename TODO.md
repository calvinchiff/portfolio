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

- [ ] **TODO-06 — Refaire la partie Projets et mettre à jour les projets**
  - Données : `public/data/projectsData.tsx` — catégorie unique `projects.dev` (les catégories `dev`/`craft` ont été fusionnées, TODO-45).
  - **Déjà fait** (TODO-45) : projet « LLM anonymization gateway » ajouté, projet STM32 retiré, points de pagination cliquables.
  - Reste : refonte visuelle de la section (mise en page des champs, images, lien GitHub par projet) et relecture des descriptions. À croiser avec TODO-09, TODO-25 et TODO-26.

- [ ] **TODO-07 — Poursuivre la mise à jour des textes restants**
  - Déjà alignés sur le CV LaTeX : `careerData.tsx` (TODO-35, réécrit en bullets concis TODO-49), `skillsData.tsx` (TODO-36/44), `generalData.tsx` (TODO-40/50).
  - Reste à réécrire : `contactData.tsx` (hors config de la popup CV), `footerData.tsx`, `navbarData.tsx` et une relecture des descriptions de projets (TODO-06).
  - Garder **EN et FR synchronisés** (le site bascule via `app/utils/LanguageContext.tsx`).

- [ ] **TODO-09 — Partie Projets : tuiles latérales qui défilent et prennent la place au centre (ou animation)**
  - Pattern existant à réutiliser : `app/components/ui/Section.tsx` → `renderInvisGrid()` (tuiles latérales floutées, masquées par dégradé).
  - Objectif : faire « entrer » le projet suivant depuis le côté vers la tuile centrale (slide + fondu), avec `prefers-reduced-motion` en repli.

- [ ] **TODO-38 — Compétences en sous-catégories (Web / Backend / Tests / DevOps)**
  - Idée issue de la discussion du 2026-10-02 : partir du regroupement simple en place (TODO-36), puis éventuellement éclater `technicalSkills` en sous-catégories et afficher **toutes** les compétences en plus petit.
  - Nécessite d'adapter `app/components/sections/SkillsSection.tsx` (affichage des groupes) et le format de `public/data/skillsData.tsx`.

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
- [x] **2026-10-02 — Contact : l'email ne brille qu'au survol de la tuile** (TODO-34) — *(branche `feat/content-cv-update`, à committer)*
  - `app/components/sections/ContactSection.tsx` : le `<span>` de l'adresse passe de `text-glow` (permanent) à `transition-all duration-150 group-hover:text-glow`.
  - **Correctif (2ᵉ passe)** : la règle CSS brute ne se déclenchait pas de façon fiable. `text-glow` est désormais une **vraie utilité Tailwind** (`@utility text-glow` dans `app/globals.css`), donc `group-hover:text-glow` emprunte exactement le même mécanisme que `group-hover:opacity-100`.
  - CSS généré vérifié : `.group-hover\:text-glow:is(:where(.group):hover *){text-shadow:…}`.
  - **Vérifié dans Brave headless (CDP, `CSS.forcePseudoState`)** : `textShadow` passe de `none` à `rgba(252, 255, 210, 0.9) 0px 0px 15px` quand la tuile est survolée.
- [x] **2026-10-02 — Expériences (`careerData`) alignées sur le CV LaTeX** (TODO-35) — *(branche `feat/content-cv-update`, à committer)*
  - La dernière entrée « Self Learning AI » est **remplacée** par l'expérience actuelle : *Consultant Software Engineer - Security & Testing*, T&S, Stuttgart (2026–2028).
  - Description reprise du CV : framework E2E `pytest` pour Bosch eBike Systems, tests embarqué/hardware et protocoles de communication, audits de sécurité et tests d'intégration des APIs cloud/backends.
  - Technos : Python, pytest, E2E automation, Security testing, Embedded & hardware, Backend & APIs, CI/CD.
- [x] **2026-10-02 — Compétences (`skillsData`) : regroupements + stack actuelle** (TODO-36) — *(branche `feat/content-cv-update`, à committer)*
  - **Retirés** : Angular, Cloud, et les doublons (JS/TS, Git/GitHub Actions, Docker/Linux).
  - **Regroupés** : JavaScript / TypeScript · React / Next.js · Node.js / Express · SQL (MySQL, PostgreSQL) · Git / GitHub Actions · Docker / Linux · C / C++ (embarqué).
  - **Ajouté** : Python / pytest (tests E2E, hardware & sécurité) — la stack actuelle prend la place libérée.
  - `SkillsSection.tsx` : clé de liste passée de `skill.icon` à `skill.name.en` (deux compétences partagent désormais l'icône `More_icon`).
  - Mise en page volontairement inchangée (choix : regroupement simple ; l'éclatement en sous-catégories reste TODO-38).
  - **Suite** : certains regroupements ont été redéfaits à la demande — Linux, Docker et GitHub Actions/Jenkins sont remis en compétences distinctes, plus une compétence « stratégie de test » → voir TODO-44.
- [x] **2026-10-02 — Centres d'intérêt & thèmes mis à jour** (TODO-37) — *(branche `feat/content-cv-update`, à committer)*
  - `skillsData.tsx` → *Sport* : « Workout » supprimé, « Calisthenics »/« Callisthénie » en EN **et** FR, ajout d'« Athletics »/« Athlétisme ».
  - `skillsData.tsx` → *Curiosity* : « AI/ML/Edge AI » → « HRL / MARL / Embodied AI », « Physics » → « Sciences », ajout d'« Environment »/« Environnement » et « Aerospace & Space »/« Aérospatial & Espace ».
  - `generalData.tsx` : intérêts enrichis (espace, environnement) et « AI, MLOps, Edge AI » remplacés par HRL/MARL & IA incarnée, espace & aérospatial, environnement, sciences physiques.
  - CV LaTeX : rubrique Divers/Interests mise en cohérence (Athlétisme/Athletics, Espace & aérospatial, Environnement, HRL/MARL) et doublon « Car » corrigé.
  - **Depuis** : « Environment »/« Environnement » et « Woodworking »/« Travail du bois » ont finalement été retirés partout → voir TODO-41.
- [x] **2026-10-02 — CV LaTeX : compilation et contenu corrigés** (ex-TODO-10) — *(branche `feat/content-cv-update`, à committer)*
  - **Bugs bloquants corrigés** : `blue!40!black` / `blue!50!black` étaient utilisés **sans `xcolor`** (compilation impossible) → `\usepackage{xcolor}` ajouté ; `Backend & Security Testing` (EN) contenait un `&` non échappé → `\&`.
  - Contenu : rubrique intérêts/divers alignée avec le site (voir TODO-37).
  - **Vérifié** : `pdflatex` passe sans erreur sur les deux `.tex`, **1 page** chacun, 0 Overfull.
  - **PDF servis non régénérés** : ils sont produits par Canva, pas par ces sources → suivi dans TODO-39.
- [x] **2026-10-02 — Accueil : tuile « me » remplacée par un résumé simple** (TODO-40) — *(branche `feat/content-cv-update`, à committer)*
  - `public/data/generalData.tsx` : le tableau `description` (interests / also / creativity) est supprimé, remplacé par `cvTitle` et `nationality` ; `me` ne garde que l'âge.
  - `app/components/sections/GeneralSection.tsx` : une info par ligne — nom, âge, titre du CV, nationalité. Le reste (3D, embarqué, IA…) est déjà couvert par les compétences plus bas.
- [x] **2026-10-02 — « Environnement » et « travail du bois » retirés partout** (TODO-41) — *(branche `feat/content-cv-update`, à committer)*
  - `skillsData.tsx` : sous-liste *Curiosity* → item « Environment/Environnement » supprimé ; sous-liste *Creativity* → « Woodworking/Travail du bois » supprimé.
  - `generalData.tsx` : les mentions d'environnement et de bois disparaissent avec l'ancien bloc `description`.
  - CV LaTeX EN/FR : « Environment »/« Environnement » retirés de la rubrique intérêts/divers.
- [x] **2026-10-02 — Timeline des expériences réalignée** (TODO-42) — *(branche `feat/content-cv-update`, à committer)*
  - `app/components/sections/CareerSection.tsx` : la barre n'est plus un pourcentage de la tuile posé en absolu (d'où le décalage), mais un **segment dessiné dans chaque ligne** entre le centre d'un rond et le centre du suivant.
  - Desktop : colonne de ronds + connecteur `top-[10px] -bottom-[10px]` centré sous les ronds ; mobile : connecteur horizontal `left-1/2 -right-1/2` entre centres.
  - La partie remplie s'arrête donc exactement sur le rond actif ; version mobile et desktop harmonisées.
- [x] ~~**2026-10-02 — Compensation des clics décalés par la courbure CRT** (TODO-43)~~ — **ANNULÉ, code retiré (2026-10-02)** — *(branche `feat/content-cv-update`, à committer)*
  - Avait été implémenté (`app/utils/barrelPointer.ts` + installation dans `ScreenCurve`) et **fonctionnait** : formule validée en CDP (~3 px d'erreur contre ~21 px avec le signe inverse) ; clic émis en `(24, 24)` redirigé vers la cible réellement dessinée en `(3, 4)`.
  - **Retiré à la demande** : on garde le comportement brut du warp (clics et survols décalés près des bords) plutôt que de risquer de casser autre chose.
  - `app/utils/barrelPointer.ts` supprimé et `app/components/ui/ScreenCurve.tsx` remis à l'identique (`git diff` vide sur ce fichier).
  - **État final : aucune compensation, ni clics ni survols.**
- [x] **2026-10-02 — Compétences : Linux, Docker, GitHub Actions/Jenkins + stratégie de test** (TODO-44) — *(branche `feat/content-cv-update`, à committer)*
  - `skillsData.tsx` : Git, Linux, Docker et GitHub Actions/Jenkins redeviennent des compétences distinctes (au lieu des groupes Git/GHA et Docker/Linux).
  - Nouvelle compétence dédiée : « Test strategy — E2E, hardware & security » / « Stratégie de test — E2E, hardware & sécurité ».
  - `Python / pytest` reste ; `Tech / C++ embarqué` conservé.
  - Vérifié à l'écran : les 11 compétences tiennent dans la tuile active sans débordement.
- [x] **2026-10-02 — Projets : catégorie unique, projet d'anonymisation, points de pagination** (TODO-45, clôt TODO-08) — *(branche `feat/content-cv-update`, à committer)*
  - `projectsData.tsx` : catégories `dev` + `craft` fusionnées en une seule `dev` ; projet STM32 « détecteur de niveau d'eau » supprimé.
  - Nouveau projet en cours ajouté depuis le README : **« LLM anonymization gateway » / « Sas d'anonymisation pour LLM »** (Python, FastAPI, pytest, Presidio, spaCy, GLiNER, PyMuPDF, RapidOCR, harnais P/R/F1).
  - `ProjectsSection.tsx` : sélecteur de catégories retiré (une seule catégorie) et **points de pagination cliquables** ajoutés — point actif plus large en largeur uniquement, en blanc avec le halo `shadow-[0_0_10px_rgba(255,255,255,0.8)]` utilisé ailleurs ; points inactifs `bg-white/60`, soit la couleur des paragraphes.
  - Vérifié à l'écran : 4 points, le premier allongé et éclairé, les autres discrets.
- [x] **2026-10-02 — Contact : lueur des logos + popup de choix du CV** (TODO-46) — *(branche `feat/content-cv-update`, à committer)*
  - `ContactSection.tsx` : les 3 logos (LinkedIn, GitHub, CV) reçoivent `group-hover:drop-shadow-[0_0_15px_rgba(252,255,210,0.9)]` — exactement le glow de `text-glow` appliqué à l'image de la tuile survolée.
  - La tuile CV n'ouvre plus directement le PDF : elle ouvre `CvPickerModal`, rendu **en portail sur `document.body`** (le filtre CRT est un containing block pour `position: fixed`, la fenêtre était sinon déplacée et déformée).
  - La popup propose **langue** (EN/FR) × **version** (Design / ATS), puis ouvre le PDF ; fermeture par la croix, le fond ou `Échap`.
  - **Vérifié dans Brave headless** : le `filter` de l'image passe de `none` à `drop-shadow(rgba(252,255,210,0.83) 0 0 13,8px)` au survol ; popup centrée (448×450) et hors du warp.
- [x] **2026-10-02 — CV : 4 versions servies (Design + ATS)** (ex-TODO-39) — *(branche `feat/content-cv-update`, à committer)*
  - Les `.tex` sont désormais **compilés en PDF** : `public/contact/{en,fr}-CV-CHIFFOT_Calvin-ats.pdf` (1 page, 0 Overfull), en plus des PDF Canva existants (`…_Calvin.pdf`).
  - La popup de la tuile CV (TODO-46) sert donc **langue × version** : le recruteur ne tombe plus sur la mauvaise langue, et dispose d'une version « ATS / simple » à côté de la version « Design ».
  - Si le contenu des `.tex` change, il faut relancer la compilation pour régénérer les `-ats.pdf`.
- [x] **2026-10-02 — Projets : tuile pleine hauteur, pagination dans la tuile, auto-avance** (TODO-47) — *(branche `feat/content-cv-update`, à committer)*
  - La tuile reprend **toute la hauteur de la grille** (comme Skills/Career) : plus de rangée de pagination hors tuile, et le flou de section disparaît bien quand la section est centrée.
  - Les points sont maintenant **dans la tuile**, en bas ; le point actif est une piste allongée qui **se remplit en 10 s** (animation CSS `auto-progress-x`) pour annoncer le projet suivant.
  - Auto-avance déclenchée seulement quand la section est au centre (`ScrollContext`) via `useAutoAdvance` ; les flèches et le clic sur un point remettent le compte à rebours à zéro.
  - **Vérifié dans Brave headless** : section centrée → `filter: none` (plus de flou) ; titre passé de « Portfolio #1 » à « The Bad Review » après 11 s.
- [x] **2026-10-02 — Carrière : auto-avance, barre progressive, points passés atténués** (TODO-48) — *(branche `feat/content-cv-update`, à committer)*
  - Section centrée : l'expérience active avance **toutes les 10 s** (`useAutoAdvance`) et le segment de barre menant au rond suivant **se remplit progressivement** sur la même durée (vertical `auto-progress-y`, horizontal `auto-progress-x`).
  - Les **points déjà passés** passent de blanc plein à `bg-white/35 border-white/35` (barre passée à `bg-white/40`) : seul le point actif reste éclatant.
  - **Vérifié dans Brave headless** : à t=4 s la barre est remplie à ~40 % entre les deux premiers ronds ; à t=11 s l'entrée active est passée de « DUT in CS » à « DevOps intern dev ».
- [x] **2026-10-02 — Textes carrière réécrits en bullets concis** (TODO-49) — *(branche `feat/content-cv-update`, à committer)*
  - Les 7 descriptions (`careerData.tsx`) passent de longs paragraphes à 2–4 puces courtes et directes, EN et FR.
  - Rendu en `whitespace-pre-line` dans la tuile Détails : les `\n` deviennent de vraies lignes.
- [x] **2026-10-02 — Accueil enrichi** (TODO-50, complète TODO-40) — *(branche `feat/content-cv-update`, à committer)*
  - Ligne 2 : « Français — actuellement en Allemagne » / « French — currently in Germany » (`nationality` + `location`).
  - Puis âge, titre du CV, « Ouvert aux opportunités à l'international » et **email cliquable** (`mailto:`, glow au survol).
- [x] **2026-10-02 — Écran de chargement (barre de surbrillance)** (TODO-51) — *(branche `feat/content-cv-update`, à committer)*
  - `app/components/ui/Preloader.tsx` : ni texte ni overlay opaque — une **barre** reprise du style des points allongés des projets (piste `bg-white/25`, remplissage blanc avec `shadow-[0_0_10px_rgba(255,255,255,0.8)]`).
  - Il force le chargement (`loading = "eager"` + `decode()`) de **toutes** les `<img>` du DOM, attend `document.fonts.ready`, garde un minimum d'affichage (700 ms) et un plafond (8 s).
  - Le contenu est masqué pendant l'attente par `ContentReveal` (`app/utils/LoadingContext.tsx`) puis **apparaît en fondu** ; le **fond reste visible** dès le départ.
  - Monté **dans `ScreenCurve`/`CRTFilter`** (`app/layout.tsx`) : courbure et grille de pixels actives dès la première frame.
  - Limite connue : les images CSS (il n'y en a pas ici) et celles montées après coup ne sont pas couvertes.
  - **Vérifié** : à 220 ms la barre est dans le warp + le CRT, le fond est visible, le contenu en `opacity: 0` ; à 2,8 s contenu `opacity: 1` et barre disparue.
- [x] **2026-10-02 — Sélection manuelle : l'auto-avance s'arrête** (TODO-52) — *(branche `feat/content-cv-update`, à committer)*
  - Carrière et projets : cliquer un rond / une flèche / une entrée passe `autoPaused` à `true` → plus de minuteur ni de remplissage, le temps de lire.
  - Le verrou se réarme automatiquement quand la section n'est plus au centre : l'auto-avance revient en re-rentrant dans la section.
  - **Vérifié** : après un choix manuel, l'index est identique 11 s plus tard (carrière 3→3, projets 1→1).
- [x] **2026-10-02 — Bug : les textes traduits restaient figés après un changement de langue** (TODO-53) — *(branche `feat/content-cv-update`, à committer)*
  - Cause : `AnimatedWrapper` réécrivait `el.textContent`, ce qui **détachait les nœuds texte de React** ; React continuait ensuite à mettre à jour des nœuds absents du document → la ligne gardait l'ancienne langue (le bug se voyait surtout sur « Français — actuellement en Allemagne »).
  - Correctif : l'animation écrit dans le **nœud texte existant** (`nodeValue`), ne touche plus aux éléments multi-nœuds, ignore ses propres frames (`WeakMap lastWritten`) et redémarre proprement si React change le texte en cours d'animation.
  - **Vérifié dans Brave headless** : EN → FR → EN affiche bien les deux langues successivement.
- [x] **2026-10-02 — Accueil : épaisseur de police de l'email alignée** (TODO-54) — *(branche `feat/content-cv-update`, à committer)*
  - Le lien `mailto:` n'héritait pas du `font-semibold` global (appliqué à `p, li, span`, mais pas à `a`) : ajout de `text-sm md:text-base xl:text-lg font-semibold` pour matcher exactement le reste de la tuile.
- [x] **2026-10-02 — CV LaTeX refaits au propre** (TODO-55) — *(branche `feat/content-cv-update`, à committer)*
  - Une **macro d'entrée unique** (`\cventry{Titre}{Dates}{Organisme, Lieu}`) est maintenant partagée par les expériences **et** les formations : même hauteur de ligne, même espacement, même style partout.
  - `\parindent` remis à `0` : c'était lui qui décalait les **titres à droite** alors que les lieux partaient de la marge. Désormais le **titre est l'ancre à la marge** et la ligne d'organisme est **indentée de 1,2 em** (alignée sur le texte des puces).
  - Organismes en **italique dans les deux sections** (les formations ne l'étaient pas) et lieux complétés avec le pays.
  - Puce réduite (`\scriptsize\textbullet`) : plus de gros point, et un seul style de liste `cvlist` pour tout le document.
  - **Vérifié** : `pdflatex` sans erreur, **1 page** chacun, 0 Overfull ; les PDF `-ats.pdf` (EN + FR) ont été régénérés.
  - Dernier passage : **plus de puces** pour *Technical Skills* et *Certificates* (lignes simples à label gras) et **plus de gras dans les puces** de l'expérience T&S, aligné sur les autres expériences.
- [x] **2026-10-04 — Grille CRT sortie du warp + logo Python dédié** (TODO-56) — *(branche `feat/content-cv-update`)*
  - `app/layout.tsx` : `CRTFilter` est passé **au-dessus** de `ScreenCurve` (au lieu d'être dedans). La grille de pixels reste donc **plate** pendant que le contenu est courbé : la distorsion ne s'applique plus au filtre CRT. Le `Preloader` reste dans les deux, donc les deux effets sont actifs dès la première frame.
  - `public/data/skillsData.tsx` : la compétence « Python / pytest » utilise le nouveau logo `public/skills/python.webp`.
  - **Vérifié en Brave headless** : `.crt-pixels` n'est plus descendant de `.screen-curve__warp` (`closest` = `null`, `filter: none`) alors que le contenu l'est toujours, et le logo Python est bien chargé.
- [x] **2026-10-04 — Mobile : la tuile centrée restait floue** (TODO-57) — *(branche `feat/content-cv-update`)*
  - Cause : `ScrollContext` utilisait un `IntersectionObserver` (`rootMargin: -30%`, `intersectionRatio > 0,5`). Sur mobile, le `vh` (grand viewport) et le viewport visuel divergent : le ratio plafonnait **sous 0,5**, donc aucune section n'était marquée active et tout restait flou.
  - Correctif : détection de la **section la plus proche du centre de l'écran** (`getBoundingClientRect` + `innerHeight / 2`), throttlée en `requestAnimationFrame`, avec écoute du scroll sur `<main>` et du `resize`.
  - `Header.tsx` consomme désormais le **même `activeSection`** que le flou (`useScrollContext`) : le nav et la tuile nette ne peuvent plus diverger.
  - **Vérifié en Brave headless** : en **390×844**, chaque section centrée → `filter: none`, `opacity: 1`, nav synchronisé ; non-régression en **1280×900**.

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
| 2026-10-02 | Contact : email en surbrillance au survol de la tuile (TODO-34) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | Expériences, compétences et intérêts alignés sur le CV LaTeX (TODO-35 → 37) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | CV LaTeX : `xcolor` manquant + `&` non échappé corrigés, compile 1 page (ex-TODO-10) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | TODO-06 recadré « refaire la partie Projets » ; TODO-38/39 ajoutés | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | Surbrillance email fiabilisée via `@utility text-glow` (TODO-34) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | Accueil simplifié (TODO-40) + environnement/bois retirés (TODO-41) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | Timeline des expériences réalignée (TODO-42) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | Compensation des clics de la courbure CRT (TODO-43) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | Compétences Linux/Docker/GitHub Actions-Jenkins + stratégie de test (TODO-44) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | Projets : catégorie unique, projet d'anonymisation, points de pagination (TODO-45, clôt TODO-08) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | Contact : lueur des logos + popup CV langue × version (TODO-46) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | CV : PDF « ATS » générés depuis les `.tex`, 4 versions servies (ex-TODO-39) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | Projets : tuile pleine hauteur, pagination interne, auto-avance 10 s (TODO-47) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | Carrière : auto-avance 10 s, barre progressive, points passés atténués (TODO-48) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | Textes carrière en bullets concis (TODO-49) + accueil enrichi (TODO-50) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | Compensation des clics CRT **retirée** à la demande (TODO-43 annulé) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | Écran de chargement en barre de surbrillance, fond visible dès le départ (TODO-51) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | Sélection manuelle = pause de l'auto-avance carrière/projets (TODO-52) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | Fix : textes figés après changement de langue (TODO-53) + email accueil (TODO-54) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-02 | CV LaTeX refaits au propre : entrée unique, alignements, puces fines (TODO-55) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-04 | Grille CRT hors du warp + logo Python dédié (TODO-56) | *(branche `feat/content-cv-update`, à committer)* |
| 2026-10-04 | Mobile : tuile centrée plus floue (détection par proximité du centre) (TODO-57) | *(branche `feat/content-cv-update`, à committer)* |
