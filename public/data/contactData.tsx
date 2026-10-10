export const contactData = {
	text1: { en: "Lets keep in touch !", fr: "Restons en contact !" },
	text2: {
		en: "You can send me an email clicking here or send it to",
		fr: "Vous pouvez m'envoyer un e-mail en cliquant ici ou à l'adresse"
	},
	emailPart1: "calvinchiffot",
	emailPart2: "protonmail",
	emailPart3: "com",
	linkedinLink: "linkedin.com",
	githubLink: "github.com",
	cv: {
		title: { en: "Download my CV", fr: "Télécharger mon CV" },
		// Short caption under the download icon. "CV" works in both languages
		// (UK / international English); switch `en` to "Resume" for US English.
		tileLabel: { en: "CV", fr: "CV" },
		subtitle: {
			en: "Pick a language and a version.",
			fr: "Choisis une langue et une version."
		},
		languageLabel: { en: "Language", fr: "Langue" },
		versionLabel: { en: "Version", fr: "Version" },
		languages: [
			{ id: "en", label: "English" },
			{ id: "fr", label: "Français" }
		],
		// `suffix` is appended to `<lang>-CV-CHIFFOT_Calvin` to build the file name.
		variants: [
			{
				id: "design",
				label: { en: "Designed", fr: "Design" },
				hint: { en: "Visual layout, with photo", fr: "Mise en page visuelle, avec photo" },
				suffix: ""
			},
			{
				id: "ats",
				label: { en: "ATS / simple", fr: "ATS / simple" },
				hint: {
					en: "Plain text, easy to parse by software",
					fr: "Texte simple, facile à parser par un logiciel"
				},
				suffix: "-ats"
			}
		],
		openLabel: { en: "Open the PDF", fr: "Ouvrir le PDF" },
		closeLabel: { en: "Close", fr: "Fermer" }
	}
};
