"use client";

import { ReactNode } from "react";
import { useLoading } from "@/app/utils/LoadingContext";

/**
 * Hides the page until the preloader has confirmed that every image is loaded,
 * then fades it in. The background (`BGDepth`) lives outside this wrapper so it
 * is already visible — and already warped by the CRT — during the wait.
 */
export default function ContentReveal({ children }: { children: ReactNode }) {
	const { ready } = useLoading();

	return (
		<div
			className={`transition-opacity duration-700 ${
				ready ? "opacity-100" : "pointer-events-none opacity-0"
			}`}
		>
			{children}
		</div>
	);
}
