"use client";

import React, { useEffect, useState } from "react";
import Tile from "@/app/components/ui/Tile";
import Section from "@/app/components/ui/Section";
import { careerData } from "@/public/data/careerData";
import { useLanguage } from "@/app/utils/LanguageContext";
import { useScrollContext } from "@/app/utils/ScrollContext";
import { useAutoAdvance } from "@/app/utils/useAutoAdvance";

/** Must stay in sync with the `auto-progress-*` animations in globals.css. */
const AUTO_ADVANCE_MS = 10000;

export default function CareerSection() {
	const { language } = useLanguage();
	const { activeSection } = useScrollContext();
	const isCentered = activeSection === "career";
	type CareerEntry = (typeof careerData.entries)[0]; // Infer type from the first entry
	const [active, setActive] = useState(careerData.entries[0]);
	// Once the visitor picks an entry by hand, stop walking: they want to read.
	const [autoPaused, setAutoPaused] = useState(false);
	const activeIndex = careerData.entries.findIndex(
		(entry) => entry.id === active.id
	);
	const lastIndex = careerData.entries.length - 1;

	useEffect(() => {
		if (!isCentered) setAutoPaused(false);
	}, [isCentered]);

	const selectEntry = (entry: CareerEntry) => {
		setActive(entry);
		setAutoPaused(true);
	};

	// When the section sits at the centre of the screen, walk the timeline.
	useAutoAdvance({
		active: isCentered && !autoPaused,
		durationMs: AUTO_ADVANCE_MS,
		resetKey: active.id,
		onAdvance: () =>
			setActive(careerData.entries[(activeIndex + 1) % careerData.entries.length])
	});

	const dotClass = (index: number) =>
		index === activeIndex
			? "bg-white border-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
			: index < activeIndex
			? "bg-white/35 border-white/35"
			: "bg-black/30 border-white/50";

	const railTrackClass = (index: number) =>
		index < activeIndex ? "bg-white/40" : "bg-white/20";

	const yearLabel = (entry: CareerEntry) =>
		`${entry.from.split("-")[2]} - ${entry.to.split("-")[2]}`;

	return (
		<Section
			id="career"
			customGridClassName="flex flex-col md:flex-row"
			nbLeftGridRows={2}
			nbRightGridRows={2}
		>
			<div className="h-full basis-1/5 md:basis-1/3">
				<Tile
					title={careerData.tiles.timeline.name[language]}
					customClassName=""
				>
					{/* Version mobile - Timeline horizontale */}
					<div className="md:hidden relative w-full h-12 mt-1">
						<ul className="flex flex-row w-full h-full">
							{careerData.entries.map((entry, index) => (
								<li key={entry.id} className="relative flex-1">
									{index < careerData.entries.length - 1 && (
										<div
											className={`absolute top-[4px] left-1/2 -right-1/2 h-1 rounded-full overflow-hidden ${railTrackClass(
												index
											)}`}
										>
											{index === activeIndex && isCentered && !autoPaused && (
												<div className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] auto-progress-x" />
											)}
										</div>
									)}
									<div
										onClick={() => selectEntry(entry)}
										className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 cursor-pointer transition-all duration-300 ${dotClass(
											index
										)}`}
									/>
									<p
										onClick={() => selectEntry(entry)}
										className={`absolute left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap text-center cursor-pointer ${
											index % 2 === 0 ? "top-4" : "-top-3"
										} ${
											active === entry ? "opacity-90 text-glow" : "opacity-40"
										}`}
									>
										{yearLabel(entry)}
									</p>
								</li>
							))}
						</ul>
					</div>

					{/* Version desktop - Timeline verticale */}
					<div className="hidden md:block h-full relative opacity-90 py-4">
						<ul className="flex flex-col h-full">
							{careerData.entries.map((entry, index) => (
								<li key={entry.id} className="relative flex-1 min-h-0">
									{index < lastIndex && (
										<div
											className={`absolute left-2 top-[10px] -bottom-[10px] w-1 rounded-full overflow-hidden ${railTrackClass(
												index
											)}`}
										>
											{index === activeIndex && isCentered && !autoPaused && (
												<div className="w-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] auto-progress-y" />
											)}
										</div>
									)}
									<div
										className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 transition-all duration-300 ${dotClass(
											index
										)}`}
									/>
									<div
										onClick={() => selectEntry(entry)}
										className={`ml-8 cursor-pointer transition-all duration-150 ${
											active === entry
												? "opacity-90 text-glow"
												: "opacity-40 hover:opacity-60"
										}`}
									>
										<h3 className="font-bold">{yearLabel(entry)}</h3>
										<p className="text-sm md:text-base">
											{entry.title[language]}
										</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</Tile>
			</div>
			<div className="h-full basis-4/5 md:basis-2/3">
				<Tile
					title={careerData.tiles.details.name[language]}
					customClassName=""
				>
					<div className="flex flex-col md:gap-1 md:mt-2 h-full justify-between py-2">
						{Object.entries(careerData.tiles.details.contentTitles).map(
							([key, label]) => {
								const value = active[key as keyof CareerEntry]; // Use the inferred type

								if (!value || (typeof value === "object" && !value[language])) {
									return null;
								}

								return (
									<div key={key} className="flex gap-2">
										<span className="font-semibold text-xs md:text-base xl:text-lg transition-all duration-150">
											{label[language]} :
											<span className="opacity-60 ml-2 text-xs md:text-base xl:text-lg transition-all duration-150 whitespace-pre-line">
												{typeof value === "object" ? value[language] : value}
											</span>
										</span>
									</div>
								);
							}
						)}
					</div>
				</Tile>
			</div>
		</Section>
	);
}
