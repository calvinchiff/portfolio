"use client";

import Image from "next/image";
import { navbarData } from "@/public/data/navbarData";
import React from "react";
import { useLanguage } from "@/app/utils/LanguageContext";
import { useScrollContext } from "@/app/utils/ScrollContext";
import BGTile from "@/app/components/ui/BGTile";
import { handleScrollToId } from "@/app/utils/scroll";

export default function Header() {
	// Same source of truth as the section blur in `Section.tsx`, so the nav
	// highlight and the un-blurred tile can never disagree.
	const { activeSection } = useScrollContext();
	const { language, changeLanguage } = useLanguage();

	const listNavbar = navbarData.map((x) => (
		<button
			onClick={() => handleScrollToId(x.id)}
			key={x.id}
			className={`cursor-pointer hover:font-bold transition-all ${
				activeSection === x.id
					? "text-white/90 font-bold text-glow"
					: "text-white/30"
			}`}
		>
			{x.title[language]}
		</button>
	));

	return (
		<header className="fixed flex items-center justify-center w-full bottom-5 md:bottom-auto md:top-[4dvh] left-0 z-20">
			<nav className="inline-flex max-w-[98vw] backdrop-blur-md rounded-[35px] shadow-xl p-3.5 md:p-4">
				<BGTile />
				<ul className="relative flex mx-auto md:mx-3 gap-1.5 md:gap-4 text-sm md:text-lg xl:text-2xl">
					{listNavbar}
				</ul>
			</nav>
			<button
				onClick={() => changeLanguage(language === "en" ? "fr" : "en")}
				className="fixed top-10 md:top-[4dvh] right-[10dvw] h-10 md:h-15 w-10 md:w-15 overflow-hidden rounded-full cursor-pointer shadow-xl hover:shadow-white/20 hover:shadow-xl transition-all duration-150"
			>
				<Image
					src={
						language === "en"
							? "/header/Flag_UK_1.png"
							: "/header/Flag_FR_1.png"
					}
					fill
					sizes="(max-width: 768px) 40px, 60px"
					style={{ objectFit: "contain" }}
					alt="Language Toggle between EN/FR"
				/>
				<div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_2px_0_rgba(255,255,255,0.1),inset_0_0_10px_rgba(255,255,255,0.2)] z-10" />
			</button>
		</header>
	);
}
