"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ScrollContextType {
	activeSection: string;
	setActiveSection: (section: string) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useScrollContext = () => {
	const context = useContext(ScrollContext);
	if (!context) {
		throw new Error("useScrollContext must be used within a ScrollProvider");
	}
	return context;
};

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [activeSection, setActiveSection] = useState<string>("");

	useEffect(() => {
		// The page scrolls inside <main>, not the document, and on a phone the
		// browser chrome makes `vh` and the visual viewport disagree — so an
		// IntersectionObserver ratio never reliably crossed 0.5 there and the
		// centred tile stayed blurred. Instead we simply pick the section whose
		// centre is closest to the middle of the screen.
		const scroller = document.querySelector("main");
		let frame = 0;

		const update = () => {
			frame = 0;
			const sections = Array.from(
				document.querySelectorAll<HTMLElement>("section[id]")
			);
			if (!sections.length) return;

			const viewportCentre = window.innerHeight / 2;
			let closestId = "";
			let closestDistance = Number.POSITIVE_INFINITY;

			for (const section of sections) {
				const rect = section.getBoundingClientRect();
				const distance = Math.abs(rect.top + rect.height / 2 - viewportCentre);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestId = section.id;
				}
			}

			if (closestId) setActiveSection(closestId);
		};

		const requestUpdate = () => {
			if (!frame) frame = window.requestAnimationFrame(update);
		};

		const target: HTMLElement | Window = scroller ?? window;
		target.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);
		const timeoutId = window.setTimeout(requestUpdate, 100);
		requestUpdate();

		return () => {
			window.clearTimeout(timeoutId);
			target.removeEventListener("scroll", requestUpdate);
			window.removeEventListener("resize", requestUpdate);
			if (frame) window.cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<ScrollContext.Provider value={{ activeSection, setActiveSection }}>
			{children}
		</ScrollContext.Provider>
	);
};
