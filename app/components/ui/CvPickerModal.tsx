"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { contactData } from "@/public/data/contactData";
import { useLanguage } from "@/app/utils/LanguageContext";

type CvLanguage = "en" | "fr";

/**
 * Modal that lets a recruiter pick the language *and* the version of the CV
 * instead of silently getting the one matching the current site language.
 *
 * Rendered through a portal on `document.body`: the app lives inside the CRT
 * barrel filter, which is a containing block for `position: fixed` and would
 * both misplace and warp the modal.
 */
export default function CvPickerModal({ onClose }: { onClose: () => void }) {
	const { language } = useLanguage();
	const [cvLanguage, setCvLanguage] = useState<CvLanguage>(language);
	const [variantId, setVariantId] = useState(contactData.cv.variants[0].id);
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [onClose]);

	if (!mounted) return null;

	const variant = contactData.cv.variants.find((item) => item.id === variantId);

	const openCv = () => {
		if (!variant) return;
		window.open(
			`/contact/${cvLanguage}-CV-CHIFFOT_Calvin${variant.suffix}.pdf`,
			"_blank"
		);
		onClose();
	};

	const optionClass = (selected: boolean) =>
		`cursor-pointer rounded-2xl border px-3 py-2 transition-all duration-150 ${
			selected
				? "border-white/50 bg-white/15 text-glow"
				: "border-white/10 bg-white/5 opacity-60 hover:opacity-90"
		}`;

	return createPortal(
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
			onClick={onClose}
			role="presentation"
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-label={contactData.cv.title[language]}
				onClick={(event) => event.stopPropagation()}
				className="relative w-[92vw] max-w-md rounded-[35px] border border-white/10 bg-[rgb(52,53,57)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.65)] md:p-6"
			>
				<button
					type="button"
					onClick={onClose}
					aria-label={contactData.cv.closeLabel[language]}
					className="absolute right-4 top-4 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/15 opacity-60 transition-all duration-150 hover:opacity-100"
				>
					×
				</button>

				<h1 className="mb-1">{contactData.cv.title[language]}</h1>
				<p className="mb-5 text-center opacity-60">
					{contactData.cv.subtitle[language]}
				</p>

				<p className="mb-1 text-xs uppercase tracking-wider opacity-50">
					{contactData.cv.languageLabel[language]}
				</p>
				<div className="mb-4 flex gap-2">
					{contactData.cv.languages.map((item) => (
						<button
							key={item.id}
							type="button"
							onClick={() => setCvLanguage(item.id as CvLanguage)}
							className={`flex-1 text-center ${optionClass(cvLanguage === item.id)}`}
						>
							{item.label}
						</button>
					))}
				</div>

				<p className="mb-1 text-xs uppercase tracking-wider opacity-50">
					{contactData.cv.versionLabel[language]}
				</p>
				<div className="mb-5 flex flex-col gap-2">
					{contactData.cv.variants.map((item) => (
						<button
							key={item.id}
							type="button"
							onClick={() => setVariantId(item.id)}
							className={`text-left ${optionClass(variantId === item.id)}`}
						>
							<span className="font-bold">{item.label[language]}</span>
							<span className="block font-normal opacity-60">
								{item.hint[language]}
							</span>
						</button>
					))}
				</div>

				<button
					type="button"
					onClick={openCv}
					className="w-full cursor-pointer rounded-2xl border border-white/20 bg-white/10 px-4 py-2 font-bold transition-all duration-150 hover:bg-white/20 hover:text-glow"
				>
					{contactData.cv.openLabel[language]}
				</button>
			</div>
		</div>,
		document.body
	);
}
