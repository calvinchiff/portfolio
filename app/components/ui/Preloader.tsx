"use client";

import { useEffect, useState } from "react";
import { useLoading } from "@/app/utils/LoadingContext";

/** Keep the bar readable even when everything is already cached. */
const MIN_DISPLAY_MS = 700;
/** Never block the site behind one slow image. */
const MAX_WAIT_MS = 8000;
const FADE_MS = 500;

/**
 * Loading bar shown over the already-visible background until every `<img>` of
 * the page is loaded and decoded (lazy Next/Image ones included). The page
 * content stays hidden meanwhile (`ContentReveal`).
 *
 * It lives *inside* `ScreenCurve`/`CRTFilter` on purpose: the curvature and the
 * pixel grid are active from the very first frame. It is `absolute` (not
 * `fixed`) because the warp filter is a containing block for fixed elements.
 */
export default function Preloader() {
	const { setReady } = useLoading();
	const [progress, setProgress] = useState(0);
	const [fading, setFading] = useState(false);
	const [gone, setGone] = useState(false);

	useEffect(() => {
		let cancelled = false;
		const startedAt = performance.now();
		const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

		const run = async () => {
			const images = Array.from(document.images);
			const total = images.length || 1;
			let settled = 0;
			const bump = () => {
				settled += 1;
				if (!cancelled) setProgress(Math.min(settled / total, 1));
			};

			const loadAll = Promise.all(
				images.map(async (image) => {
					try {
						// Lazy images below the fold would otherwise stay empty.
						image.loading = "eager";
						if (!image.complete) await image.decode();
					} catch {
						/* a broken image must not block the site */
					}
					bump();
				})
			);

			await Promise.race([loadAll, wait(MAX_WAIT_MS)]);
			try {
				await document.fonts.ready;
			} catch {
				/* ignore */
			}

			const elapsed = performance.now() - startedAt;
			if (elapsed < MIN_DISPLAY_MS) await wait(MIN_DISPLAY_MS - elapsed);
			if (cancelled) return;

			setProgress(1);
			setReady(true);
			setFading(true);
			await wait(FADE_MS);
			if (!cancelled) setGone(true);
		};

		void run();
		return () => {
			cancelled = true;
		};
	}, [setReady]);

	if (gone) return null;

	return (
		<div
			aria-hidden="true"
			className={`pointer-events-none absolute left-0 top-0 z-10 flex h-[100dvh] w-full items-center justify-center transition-opacity duration-500 ${
				fading ? "opacity-0" : "opacity-100"
			}`}
		>
			{/* Same shape and glow as the active project dot. */}
			<span className="relative block h-2 w-40 rounded-full bg-white/25 md:w-56">
				<span
					className="absolute inset-y-0 left-0 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-[width] duration-300 ease-out"
					style={{ width: `${Math.round(progress * 100)}%` }}
				/>
			</span>
		</div>
	);
}
