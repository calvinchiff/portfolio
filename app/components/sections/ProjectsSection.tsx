import React, { useEffect, useState } from "react";
import Image from "next/image";
import Tile from "@/app/components/ui/Tile";
import Section from "@/app/components/ui/Section";
import { projectsData } from "@/public/data/projectsData";
import { useLanguage } from "@/app/utils/LanguageContext";
import { useScrollContext } from "@/app/utils/ScrollContext";
import { useAutoAdvance } from "@/app/utils/useAutoAdvance";

/** Must stay in sync with the `auto-progress-*` animations in globals.css. */
const AUTO_ADVANCE_MS = 10000;

export default function ProjectsSection() {
	const { language } = useLanguage();
	const { activeSection } = useScrollContext();
	const isCentered = activeSection === "projects";
	const currentProjects = projectsData.projects.dev;
	const projectCount = currentProjects.length;
	const [projectIndex, setProjectIndex] = useState(0);
	// A manual pick (dot or arrow) stops the walk so the visitor can read.
	const [autoPaused, setAutoPaused] = useState(false);

	type ProjectEntry = (typeof projectsData.projects.dev)[0];

	useEffect(() => {
		if (!isCentered) setAutoPaused(false);
	}, [isCentered]);

	// Same auto-walk as the Career timeline, but the countdown fills the active dot.
	useAutoAdvance({
		active: isCentered && !autoPaused,
		durationMs: AUTO_ADVANCE_MS,
		resetKey: projectIndex,
		onAdvance: () => setProjectIndex((index) => (index + 1) % projectCount)
	});

	const goToProject = (index: number) => {
		setProjectIndex(index);
		setAutoPaused(true);
	};

	const handleNext = () => {
		goToProject((projectIndex + 1) % projectCount);
	};

	const handlePrevious = () => {
		goToProject((projectIndex - 1 + projectCount) % projectCount);
	};

	return (
		<Section customGridClassName="" id="projects">
			<div className="relative h-full">
				<button
					onClick={handlePrevious}
					className="w-10 h-10 md:w-20 md:h-20 absolute z-10 -left-4 md:-left-18 top-1/2 -translate-y-1/2 p-2 cursor-pointer transition-transform duration-200 hover:-translate-x-2 opacity-70 hover:opacity-100"
				>
					<Image
						src="/projects/arrow_left.png"
						alt="Previous"
						sizes="100%"
						style={{ objectFit: "contain" }}
						fill
					/>
				</button>

				<button
					onClick={handleNext}
					className="w-10 h-10 md:w-20 md:h-20 absolute z-100 -right-4 md:-right-18 top-1/2 -translate-y-1/2 p-2 cursor-pointer transition-transform duration-200 hover:translate-x-2 opacity-70 hover:opacity-100"
				>
					<Image
						src="/projects/arrow_right.png"
						alt="Next"
						sizes="100%"
						style={{ objectFit: "contain" }}
						fill
					/>
				</button>

				<Tile
					title={`${
						currentProjects[projectIndex]
							? `${currentProjects[projectIndex].title[language]} #${currentProjects[projectIndex].id}`
							: "Loading..."
					}`}
					customClassName=""
				>
					{currentProjects[projectIndex] && (
						<div className="flex flex-col h-full md:mt-2 px-2 md:py-2 md:px-4 gap-2 justify-center pb-8">
							{Object.entries(projectsData.contentTitles).map(
								([key, label]) => {
									const value =
										currentProjects[projectIndex]?.[
											key as keyof ProjectEntry
										];

									if (
										!value ||
										(typeof value === "object" && !value[language])
									) {
										return null;
									}

									return (
										<div key={key} className="flex gap-2">
											<span className="font-semibold">
												{label[language]} :
												<span className="opacity-60 ml-2">
													{typeof value === "object"
														? value[language]
														: value}
												</span>
											</span>
										</div>
									);
								}
							)}
						</div>
					)}

					{/* Pagination inside the tile: the active pill fills over the countdown. */}
					<div className="absolute bottom-0 left-0 right-0 flex flex-row items-center justify-center gap-2 md:gap-3">
						{currentProjects.map((project, index) => {
							const isActive = index === projectIndex;
							return (
								<button
									key={project.id}
									type="button"
									onClick={() => goToProject(index)}
									aria-label={`${project.title[language]} (${index + 1}/${
										projectCount
									})`}
									aria-current={isActive}
									className={`relative h-2 rounded-full cursor-pointer transition-all duration-300 ${
										isActive
											? "w-8 bg-white/30"
											: "w-2 bg-white/60 hover:bg-white/80"
									}`}
								>
									{isActive && (
										<span
											className={`absolute inset-y-0 left-0 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] ${
												isCentered && !autoPaused
													? "auto-progress-x"
													: "w-full"
											}`}
										/>
									)}
								</button>
							);
						})}
					</div>
				</Tile>
			</div>
		</Section>
	);
}
