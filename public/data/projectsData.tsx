export const projectsData = {
	contentTitles: {
		description: { en: "Description", fr: "Description" },
		date: { en: "Date", fr: "Date" },
		lien: { en: "Lien", fr: "Lien" },
		techno: { en: "Techno", fr: "Techno" },
		state: { en: "State", fr: "État" }
	},
	// Newest first: the `id` doubles as the displayed number, so keep both in
	// sync when adding a project.
	projects: {
		dev: [
			{
				id: "1",
				title: {
					en: "LLM anonymization gateway",
					fr: "Sas d’anonymisation pour LLM"
				},
				description: {
					en: "A gateway that anonymizes a document before sending it to an LLM, then restores it on the way back. The model only sees neutral tokens such as <NAME_1>. The mapping table never leaves the server. Handles .docx, .pdf, .pptx, .xlsx and images (OCR). Three detection strategies: regex, Presidio, and hybrid Presidio + GLiNER. A precision/recall/F1 harness compares them on public FR/EN/DE datasets. Also ships a web UI, a CLI and a batch mode. Nothing is persisted.",
					fr: "Un sas qui anonymise un document avant de l’envoyer à un LLM, puis le restitue au retour. Le modèle ne voit que des jetons neutres comme <NOM_1>. La table de correspondance ne quitte jamais le serveur. Gère les .docx, .pdf, .pptx, .xlsx et les images (OCR). Trois stratégies de détection : regex, Presidio, et hybride Presidio + GLiNER. Un harnais précision/rappel/F1 les compare sur des datasets publics FR/EN/DE. Fournit aussi une interface web, une CLI et un mode batch. Rien n’est persisté."
				},
				link: "",
				date: "10-2026",
				techno:
					"Python, FastAPI, pytest, Presidio, spaCy, GLiNER, PyMuPDF, RapidOCR, OCR, P/R/F1 evaluation",
				state: { en: "In progress", fr: "En cours" }
			},
			{
				id: "2",
				title: { en: "The Bad Review", fr: "The Bad Review" },
				description: {
					en: "An online game where players enter a name to start playing, with the option to link their Letterboxd profile by providing their account URL. The goal is to guess which movie a review is referring to. Reviews come from linked profiles or from popular reviews with many likes for being particularly funny.",
					fr: "Un jeu en ligne où les joueurs choisissent simplement un pseudo pour commencer à jouer, avec la possibilité d’ajouter leur profil Letterboxd en renseignant l’URL de leur compte. Le but est de deviner à quel film correspond une critique. Les critiques proviennent des profils ajoutés ou de critiques populaires ayant reçu beaucoup de likes parce qu’elles sont particulièrement drôles."
				},
				link: "",
				date: "04-2025",
				techno:
					"Next.js, TypeScript, Tailwind CSS, Socket.io, Figma, Express, PostgreSQL, Prisma, Jest, Docker, GitHub Actions",
				state: {
					en: "On hold – API access unavailable",
					fr: "Suspendu – Pas d’accès à l’API Letterboxd"
				}
			},
			{
				id: "3",
				title: { en: "Portfolio", fr: "Portfolio" },
				description: {
					en: "It's the portfolio you are watching right now !",
					fr: "C'est le portfolio que vous regardez en ce moment même !"
				},
				link: "",
				date: "03-2025",
				techno:
					"Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Figma, Docker, GitHub Actions, VPS Linux, Nginx",
				state: { en: "Done", fr: "Terminé" }
			},
			{
				id: "4",
				title: { en: "Mangatheque API", fr: "Mangatheque API" },
				description: {
					en: "Built the backend for Mangatheque, an app that helps users keep track of their manga collections. Developed a secure API for user authentication and set up the database using NodeJS, MySQL, and Sequelize. Configured CI/CD pipelines to ensure smooth deployment and integration, utilizing Docker, GCP, and GitHub Actions.",
					fr: "Développement du backend pour Mangatheque, une application permettant aux utilisateurs de suivre leur collection de mangas. Création d’une API sécurisée pour l’authentification des utilisateurs et mise en place de la base de données avec NodeJS, MySQL et Sequelize. Configuration des pipelines CI/CD pour assurer une intégration et un déploiement fluides, en utilisant Docker, GCP et GitHub Actions."
				},
				link: "",
				date: "03-2024",
				techno: "Node.js, MySQL, Sequelize, Docker, GCP, GitHub Actions",
				state: { en: "Done", fr: "Terminé" }
			}
		]
	}
};
