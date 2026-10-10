import React, { useState } from "react";
import Image from "next/image";
import Tile from "@/app/components/ui/Tile";
import Section from "@/app/components/ui/Section";
import CvPickerModal from "@/app/components/ui/CvPickerModal";
import { contactData } from "@/public/data/contactData";
import { useLanguage } from "@/app/utils/LanguageContext";

/** Same glow as `text-glow`, applied to the logos on hover of their own tile. */
const logoHover =
	"transition-all duration-150 group-hover:drop-shadow-[0_0_15px_rgba(252,255,210,0.9)]";

export default function ContactSection() {
	const { language } = useLanguage();
	const [cvPickerOpen, setCvPickerOpen] = useState(false);

	const handleEmailClick = () => {
		if (window.getSelection()?.toString()) {
			return;
		}
		window.location.href = `mailto:${contactData.emailPart1}@${contactData.emailPart2}.${contactData.emailPart3}`;
	};

	return (
		<Section id="contact" nbLeftGridRows={2} nbRightGridRows={2}>
			<div className="flex flex-col h-full gap-2">
				<Tile
					customClassName="basis-1/2 md:col-span-3 row-span-2 md:row-span-1 cursor-pointer"
					onClick={handleEmailClick}
				>
					<div className="h-full gap-4 flex flex-col text-center items-center justify-center font-semibold opacity-90">
						<span className="text-sm md:text-lg xl:text-xl">
							{contactData.text1[language]}
						</span>
						<span className="text-sm md:text-lg xl:text-xl">
							{contactData.text2[language]}{" "}
							<span className="font-bold text-sm md:text-lg xl:text-xl transition-all duration-150 group-hover:text-glow">
								{contactData.emailPart1}@{contactData.emailPart2}.
								{contactData.emailPart3}
							</span>
						</span>
					</div>
				</Tile>
				<div className="flex flex-row basis-1/2 gap-2">
					<div className="flex flex-col md:flex-row w-full gap-2 basis-1/2 md:basis-2/3">
						<Tile
							customClassName="cursor-pointer"
							onClick={() =>
								window.open(
									"https://www.linkedin.com/in/calvinchiffot/",
									"_blank"
								)
							}
						>
							<div className="relative h-full w-full flex items-center justify-center">
								<Image
									src="/contact/linkedin-logo.png"
									sizes="(max-width: 768px) 150px, 250px"
									style={{ objectFit: "contain" }}
									fill
									alt="Logo of Linkedin"
									className={`opacity-90 group-hover:opacity-100 ${logoHover}`}
								/>
							</div>
						</Tile>
						<Tile
							customClassName="cursor-pointer"
							onClick={() =>
								window.open("https://github.com/calvinchiff", "_blank")
							}
						>
							<div className="relative h-full w-full flex items-center justify-center">
								<Image
									src="/contact/github-logo.png"
									sizes="(max-width: 768px) 150px, 250px"
									style={{ objectFit: "contain" }}
									fill
									alt="Logo of Github"
									className={`opacity-90 group-hover:opacity-100 ${logoHover}`}
								/>
							</div>
						</Tile>
					</div>
					<div className="basis-1/2 md:basis-1/3">
						<Tile
							customClassName="cursor-pointer"
							onClick={() => setCvPickerOpen(true)}
						>
							<div className="relative h-full w-full flex flex-col items-center justify-center gap-1">
								{/* Inline download glyph: no asset, stays crisp at any size, and
								    needs no SVG exception in the image optimizer. */}
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth={1.6}
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
									className="w-[44%] max-h-[55%] text-white opacity-70 transition-all duration-150 group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_rgba(252,255,210,0.9)]"
								>
									<path d="M12 3v11" />
									<path d="m7.5 9.5 4.5 4.5 4.5-4.5" />
									<path d="M4 16.5v2A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5v-2" />
								</svg>
								<span className="shrink-0 text-xs md:text-sm font-semibold opacity-70 transition-all duration-150 group-hover:opacity-100 group-hover:text-glow">
									{contactData.cv.tileLabel[language]}
								</span>
							</div>
						</Tile>
					</div>
				</div>
			</div>

			{cvPickerOpen && <CvPickerModal onClose={() => setCvPickerOpen(false)} />}
		</Section>
	);
}
