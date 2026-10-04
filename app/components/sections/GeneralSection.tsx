"use client";
import React from "react";
import Image from "next/image";
import Tile from "@/app/components/ui/Tile";
import Section from "@/app/components/ui/Section";
import { generalData } from "@/public/data/generalData";
import { contactData } from "@/public/data/contactData";
import { useLanguage } from "@/app/utils/LanguageContext";
import LinkImageTile from "@/app/components/ui/LinkImageTile";

export default function GeneralSection() {
	const { language } = useLanguage();

	const birthDate = new Date("2001-03-30");
	const today = new Date();

	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDifference = today.getMonth() - birthDate.getMonth();

	if (
		monthDifference < 0 ||
		(monthDifference === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}

	return (
		<Section
			id="general"
			customGridClassName="flex flex-col"
			nbLeftGridRows={2}
			nbRightGridRows={1}
		>
			<div className="h-full basis-2/3 md:basis-1/2">
				{/* General Tile */}
				<Tile>
					<div className="flex flex-col md:flex-row h-full justify-center">
						<div className="basis-1/3 relative">
							<Image
								alt="Avatar logo"
								src="/general/Me_Logo.png"
								fill
								sizes="100%"
								style={{ objectFit: "contain" }}
							/>
						</div>
						<div className="flex flex-col md:basis-2/3 self-center items-center md:items-start gap-1 text-center md:text-left">
							<h2 className="text-center md:text-left">{generalData.name}</h2>
							{/* Single expression on purpose: `AnimatedWrapper` rewrites
							    textContent, which detaches the original text nodes. With
							    several text children React keeps updating stale nodes, so
							    this line used to stay frozen in the previous language. */}
							<p className="opacity-70">
								{`${generalData.nationality[language]} — ${generalData.location[language]}`}
							</p>
							<p className="opacity-70">{age + generalData.me[language]}</p>
							<p className="opacity-70">{generalData.cvTitle[language]}</p>
							<p className="opacity-70">
								{generalData.availability[language]}
							</p>
							<a
								href={`mailto:${contactData.emailPart1}@${contactData.emailPart2}.${contactData.emailPart3}`}
								className="text-sm md:text-base xl:text-lg font-semibold opacity-70 hover:opacity-100 hover:text-glow transition-all duration-150"
							>
								{`${contactData.emailPart1}@${contactData.emailPart2}.${contactData.emailPart3}`}
							</a>
						</div>
					</div>
				</Tile>
			</div>

			<div className="flex flex-row h-full gap-2 basis-1/3 md:basis-1/2">
				{/* Skills Tile */}
				<LinkImageTile
					title={generalData.tiles[0].title[language]}
					sectionLink="skills"
					imgSrc="/general/Skills_Logo.png"
				/>

				{/* Career Tile */}
				<LinkImageTile
					title={generalData.tiles[1].title[language]}
					sectionLink="career"
					imgSrc="/general/Career_Logo.png"
				/>

				{/* Projects Tile */}
				<LinkImageTile
					title={generalData.tiles[2].title[language]}
					sectionLink="projects"
					imgSrc="/general/Projects_Logo.png"
				/>
			</div>
		</Section>
	);
}
