/* ==========================================================================
   Calvin Chiffot — portfolio
   Small vanilla ES6 script. Responsibilities:
     1. language switching (data-i18n / data-i18n-attr + window.LOCALES)
     2. rendering the career timeline and the project cards
     3. gentle reveal-on-scroll
   No dependencies, no build step, works from file:// as well as a web server.
   ========================================================================== */

/* --------------------------------- Config -------------------------------- */
const CONFIG = {
	supported: ["en", "fr"],
	fallback: "en",
	storageKey: "portfolio.language",
	birth: { year: 2001, month: 3, day: 30 },
	email: "calvinchiffot@protonmail.com"
};

/* ---------------------------------- Data --------------------------------- */
const CAREER = [
	{
		id: "1",
		title: "career.t1",
		school: "IUT Vannes",
		location: "Vannes, France",
		from: "10-09-2019",
		to: "10-06-2021",
		description: "career.d1",
		techno: "Java, SQL, CS Bases, HTML/CSS"
	},
	{
		id: "2",
		title: "career.t2",
		company: "Arkea",
		location: "Nantes, France",
		from: "10-04-2021",
		to: "10-06-2021",
		description: "career.d2",
		techno: "Java, Jenkins, Docker, DBMaintain, Liquibase"
	},
	{
		id: "3",
		title: "career.t3",
		school: "EPSI Nantes",
		location: "Saint-Herblain, France",
		from: "02-10-2021",
		to: "10-10-2022",
		description: "career.d3",
		techno: "React, HTML/CSS, Node.js, SQL, Git, CI/CD, DevOps (Docker, Kubernetes)"
	},
	{
		id: "4",
		title: "career.t4",
		company: "SCC",
		location: "Saint-Herblain, France",
		from: "02-10-2021",
		to: "10-10-2022",
		description: "career.d4",
		techno: "HTML/CSS, JavaScript, Node.js, GitHub Actions, Azure, SQL"
	},
	{
		id: "5",
		title: "career.t5",
		school: "EPSI Nantes",
		location: "Nantes, France",
		from: "02-10-2022",
		to: "10-10-2024",
		description: "career.d5"
	},
	{
		id: "6",
		title: "career.t6",
		company: "LTTD Consulting",
		location: "Saint-Herblain, France",
		from: "02-05-2023",
		to: "10-10-2024",
		description: "career.d6",
		techno: "Angular, SQL, ERP Infor M3, Java"
	},
	{
		id: "7",
		title: "career.t7",
		school: "Calvin's School",
		location: "Nantes, France",
		from: "25-01-2025",
		to: "??-??-????",
		description: "career.d7",
		techno:
			"Next.js, React, TailwindCSS, C/C++, STM32, FreeTROS, Python, TensorFlow, PyTorch, scikit-learn, Docker, Kubernetes"
	}
];

const PROJECTS = [
	{
		index: "01",
		title: "projects.p1Title",
		date: "03-2025",
		state: "projects.p1State",
		description: "projects.p1Description",
		techno: "Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Figma, Docker, GitHub Actions, VPS Linux, Nginx"
	},
	{
		index: "02",
		title: "projects.p2Title",
		date: "04-2025",
		state: "projects.p2State",
		description: "projects.p2Description",
		techno:
			"Next.js, TypeScript, Tailwind CSS, Socket.io, Figma, Express, PostgreSQL, Prisma, Jest, Docker, GitHub Actions"
	},
	{
		index: "03",
		title: "projects.p3Title",
		date: "03-2024",
		state: "projects.p3State",
		description: "projects.p3Description",
		techno: "Node.js, MySQL, Sequelize, Docker, GCP, GitHub Actions"
	},
	{
		index: "04",
		title: "projects.p4Title",
		date: "03-2025",
		state: "projects.p4State",
		description: "projects.p4Description",
		techno: "STM32, C/C++, Next.js, Node.js, MySQL, Docker"
	}
];

/* --------------------------------- Helpers ------------------------------- */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const locales = () => window.LOCALES || {};
const currentLang = () => document.documentElement.lang || CONFIG.fallback;

/** Translation for a key, in the given language. */
const t = (key, lang = currentLang()) => {
	const entry = locales()[key];
	if (!entry) return "";
	return entry[lang] ?? entry[CONFIG.fallback] ?? "";
};

const escapeHtml = (value) =>
	String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

/** "10-06-2021" -> "2021"; returns "" when the date is unknown ("??-??-????"). */
const yearOf = (date) => {
	const match = String(date || "").match(/\d{4}/);
	return match ? match[0] : "";
};

/** Comma separated technology strings become chips. */
const stackList = (techno) => {
	if (!techno) return "";
	const items = techno
		.split(",")
		.map((item) => item.trim())
		.filter(Boolean)
		.map((item) => `<li>${escapeHtml(item)}</li>`)
		.join("");
	return items ? `<ul class="job__stack">${items}</ul>` : "";
};

const chips = (techno) => {
	if (!techno) return "";
	const items = techno
		.split(",")
		.map((item) => item.trim())
		.filter(Boolean)
		.map((item) => `<li>${escapeHtml(item)}</li>`)
		.join("");
	return items ? `<ul class="card__stack">${items}</ul>` : "";
};

const isOngoing = (state) => /progress|en cours|cours/i.test(state);

/* -------------------------------- Rendering ------------------------------ */
function renderCareer(lang = currentLang()) {
	const list = $("#timeline");
	if (!list) return;

	list.innerHTML = CAREER.map((job) => {
		const start = yearOf(job.from);
		const end = yearOf(job.to) || t("career.present", lang);
		const period = `${escapeHtml(start)} — ${escapeHtml(end)}`;

		const whereRow = [job.company, job.school, job.location]
			.filter(Boolean)
			.map((item) => `<span>${escapeHtml(item)}</span>`)
			.join("");

		return (
			`<li class="job">` +
			`<p class="job__period"><span>${period}</span></p>` +
			`<div class="job__body">` +
			`<h3 class="job__role">${escapeHtml(t(job.title, lang))}</h3>` +
			(whereRow ? `<p class="job__where">${whereRow}</p>` : "") +
			`<p class="job__text">${escapeHtml(t(job.description, lang))}</p>` +
			stackList(job.techno) +
			`</div>` +
			`</li>`
		);
	}).join("");
}

function renderProjects(lang = currentLang()) {
	const list = $("#projects-list");
	if (!list) return;

	list.innerHTML = PROJECTS.map((project) => {
		const state = t(project.state, lang);
		return (
			`<article class="card">` +
			`<div class="card__top">` +
			`<span>${escapeHtml(project.index)} / ${escapeHtml(project.date)}</span>` +
			(state
				? `<span class="card__state"${isOngoing(state) ? ' data-state="active"' : ""}>${escapeHtml(state)}</span>`
				: "") +
			`</div>` +
			`<h3 class="card__title">${escapeHtml(t(project.title, lang))}</h3>` +
			`<p class="card__text">${escapeHtml(t(project.description, lang))}</p>` +
			chips(project.techno) +
			`</article>`
		);
	}).join("");
}

function renderAge() {
	const node = $("#age");
	if (!node) return;
	const today = new Date();
	const { year, month, day } = CONFIG.birth;
	let age = today.getFullYear() - year;
	const monthDiff = today.getMonth() - (month - 1);
	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) age -= 1;
	node.textContent = String(age);
}

/* ---------------------------------- i18n --------------------------------- */
/** Replaces the text of every [data-i18n] node. */
function applyTranslations(lang) {
	$$("[data-i18n]").forEach((node) => {
		const text = t(node.dataset.i18n, lang);
		if (text) node.textContent = text;
	});

	$$("[data-i18n-attr]").forEach((node) => {
		node.dataset.i18nAttr.split(",").forEach((pair) => {
			const [attribute, key] = pair.split(":").map((part) => (part || "").trim());
			if (!attribute || !key) return;
			const text = t(key, lang);
			if (text) node.setAttribute(attribute, text);
		});
	});
}

/** Keeps <title>, meta description and OpenGraph/Twitter tags in sync. */
function applyMeta(lang) {
	const title = t("meta.title", lang);
	const description = t("meta.description", lang);
	if (title) document.title = title;

	[
		['meta[name="description"]', description],
		['meta[property="og:title"]', title],
		['meta[property="og:description"]', description],
		['meta[name="twitter:title"]', title],
		['meta[name="twitter:description"]', description]
	].forEach(([selector, value]) => {
		const node = document.head.querySelector(selector);
		if (node && value) node.setAttribute("content", value);
	});
}

function applyResume(lang) {
	const link = $("#resume-link");
	if (link) link.href = `public/contact/${lang === "fr" ? "fr" : "en"}-CV-CHIFFOT_Calvin.pdf`;
}

function syncToggle(lang) {
	$$("#lang-toggle [data-lang]").forEach((node) => {
		node.classList.toggle("is-on", node.dataset.lang === lang);
	});
}

function setLanguage(lang) {
	const next = CONFIG.supported.includes(lang) ? lang : CONFIG.fallback;
	document.documentElement.lang = next;

	try {
		localStorage.setItem(CONFIG.storageKey, next);
	} catch (error) {
		/* storage can be blocked — the page still works */
	}

	applyTranslations(next);
	applyMeta(next);
	syncToggle(next);
	applyResume(next);
	renderCareer(next);
	renderProjects(next);
}

function preferredLanguage() {
	let stored = null;
	try {
		stored = localStorage.getItem(CONFIG.storageKey);
	} catch (error) {
		stored = null;
	}
	if (CONFIG.supported.includes(stored)) return stored;
	const browser = String(navigator.language || CONFIG.fallback).toLowerCase();
	return browser.startsWith("fr") ? "fr" : CONFIG.fallback;
}

/* -------------------------------- Behaviour ------------------------------ */
function initLanguageToggle() {
	const toggle = $("#lang-toggle");
	if (!toggle) return;
	toggle.addEventListener("click", () => {
		setLanguage(currentLang() === "en" ? "fr" : "en");
	});
}

/** Subtle fade-up when a block enters the viewport (once per element). */
function initReveal() {
	const targets = $$(".hero > *, .section > *, .footer__inner");
	if (!targets.length) return;

	targets.forEach((node) => node.classList.add("reveal"));

	if (!("IntersectionObserver" in window)) {
		targets.forEach((node) => node.classList.add("is-in"));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add("is-in");
				observer.unobserve(entry.target);
			});
		},
		{ rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
	);

	targets.forEach((node) => observer.observe(node));
}

function initFooter() {
	const year = $("#year");
	if (year) year.textContent = String(new Date().getFullYear());
}

/* --------------------------------- Startup ------------------------------- */
function start() {
	renderAge();
	initFooter();
	initLanguageToggle();
	initReveal();

	// First paint: content rendered by script, so render before the language pass.
	const lang = preferredLanguage();
	renderCareer(lang);
	renderProjects(lang);
	setLanguage(lang);

	// Handy for debugging in the console.
	window.portfolio = { setLanguage, get language() { return currentLang(); } };
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", start, { once: true });
} else {
	start();
}
