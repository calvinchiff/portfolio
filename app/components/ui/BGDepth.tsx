// components/BGDepth.tsx

"use client";

import { useEffect, useRef } from "react";

/**
 * Animated deep-gray background.
 *
 * A cheap 2D canvas colour field. Two gradient stops drift through a list of
 * dark gray nuances — charcoal, cool, neutral, warm — so any given screenful
 * holds a couple of near-neutral tones: never black, never bright and never a
 * coloured cast. A slow sine warp keeps the bands organic. The canvas renders
 * at 1/8 resolution and is scaled up with a heavy CSS blur, which keeps it
 * smooth and battery friendly.
 */

type Rgb = [number, number, number];

/**
 * The four dark gray nuances, given as the fraction of each channel at full
 * strength. They differ by a whisper of temperature — a touch cool, neutral, a
 * touch warm — so the field still breathes without ever reading as coloured.
 * The gradient gently lerps between them and never washes out to white.
 */
const GRAY_DEEP: Rgb = [0.14, 0.14, 0.15];
const GRAY_COOL: Rgb = [0.2, 0.21, 0.23];
const GRAY_MID: Rgb = [0.24, 0.24, 0.25];
const GRAY_WARM: Rgb = [0.27, 0.26, 0.25];

/** Dark gray pairings the gradient travels through. */
const PAIRS: { a: Rgb; b: Rgb }[] = [
	{ a: GRAY_DEEP, b: GRAY_COOL },
	{ a: GRAY_COOL, b: GRAY_MID },
	{ a: GRAY_MID, b: GRAY_WARM },
	{ a: GRAY_WARM, b: GRAY_DEEP }
];

/** Below this the canvas renders at 1/SCALE of the CSS size. */
const SCALE = 8;
/** Target frame rate — the motion is slow, 30fps is plenty. */
const FRAME_MS = 1000 / 30;

/** Overall depth: 1 = the palette above, lower = darker. */
const LEVEL = 0.55;
/** The palette is normalised, the canvas buffer is 8-bit. */
const TO_BYTE = 255;

export default function BGDepth() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d", { alpha: false });
		if (!ctx) return;

		const reduceMotion =
			typeof window.matchMedia === "function" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		let width = 0;
		let height = 0;
		let image: ImageData | null = null;
		let frame = 0;
		let last = 0;
		let start = 0;
		let running = true;

		const build = () => {
			width = Math.max(1, Math.round(window.innerWidth / SCALE));
			height = Math.max(1, Math.round(window.innerHeight / SCALE));
			canvas.width = width;
			canvas.height = height;
			image = ctx.createImageData(width, height);
		};

		const draw = (time: number) => {
			if (!image) return;
			const data = image.data;
			const t = time / 1000;

			// Two gradient stops travel through a list of dark gray pairings over a
			// long cycle — charcoal, cool, neutral, warm — so each screenful holds
			// at most two near-neutral tones at a time.
			const cycle = ((t * 0.017) % 1 + 1) % 1;
			const step = cycle * PAIRS.length;
			const from = PAIRS[Math.floor(step) % PAIRS.length];
			const to = PAIRS[(Math.floor(step) + 1) % PAIRS.length];
			const mix = step - Math.floor(step);

			const stopA: Rgb = [
				from.a[0] + (to.a[0] - from.a[0]) * mix,
				from.a[1] + (to.a[1] - from.a[1]) * mix,
				from.a[2] + (to.a[2] - from.a[2]) * mix
			];
			const stopB: Rgb = [
				from.b[0] + (to.b[0] - from.b[0]) * mix,
				from.b[1] + (to.b[1] - from.b[1]) * mix,
				from.b[2] + (to.b[2] - from.b[2]) * mix
			];

			let index = 0;
			for (let y = 0; y < height; y += 1) {
				const fy = y / (height - 1 || 1);
				for (let x = 0; x < width; x += 1) {
					const fx = x / (width - 1 || 1);

					// diagonal mix between the two stops, plus a slow organic warp
					const t0 = (1 - fx) * (1 - 0.55 * fy);
					const t1 = 1 - t0;
					const warp =
						1 + 0.22 * Math.sin(fx * 3.7 + fy * 2.9 + t * 0.15) * Math.sin(fy * 3.1 - t * 0.11);
					const scale = warp * LEVEL * TO_BYTE;

					data[index] = (stopA[0] * t0 + stopB[0] * t1) * scale;
					data[index + 1] = (stopA[1] * t0 + stopB[1] * t1) * scale;
					data[index + 2] = (stopA[2] * t0 + stopB[2] * t1) * scale;
					data[index + 3] = 255;
					index += 4;
				}
			}

			ctx.putImageData(image, 0, 0);

			// pull the corners down so the panels keep their contrast
			const maxSide = Math.max(width, height);
			const vignette = ctx.createRadialGradient(
				width / 2,
				height * 0.42,
				Math.min(width, height) * 0.22,
				width / 2,
				height * 0.42,
				maxSide * 0.85
			);
			vignette.addColorStop(0, "rgba(6, 6, 7, 0)");
			vignette.addColorStop(0.62, "rgba(6, 6, 7, 0.1)");
			vignette.addColorStop(1, "rgba(4, 4, 5, 0.5)");
			ctx.fillStyle = vignette;
			ctx.fillRect(0, 0, width, height);
		};

		const loop = (now: number) => {
			frame = window.requestAnimationFrame(loop);
			if (!running) return;
			if (!start) start = now;
			if (now - last < FRAME_MS) return;
			last = now;
			draw(now - start);
		};

		const restart = () => {
			build();
			draw(performance.now() - start);
		};

		build();
		restart();

		if (!reduceMotion) frame = window.requestAnimationFrame(loop);

		let resizeTimer = 0;
		const onResize = () => {
			window.clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(restart, 160);
		};

		const onVisibility = () => {
			running = !document.hidden;
			if (running) last = 0;
		};

		window.addEventListener("resize", onResize);
		document.addEventListener("visibilitychange", onVisibility);

		return () => {
			window.cancelAnimationFrame(frame);
			window.clearTimeout(resizeTimer);
			window.removeEventListener("resize", onResize);
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, []);

	return (
		<div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#0b0b0c]">
			{/* 1. colour field: the drifting dark gray tones */}
			<canvas
				ref={canvasRef}
				aria-hidden="true"
				className="h-full w-full scale-[1.12] blur-[26px] md:blur-[56px]"
			/>

			{/* 2. depth: soft glows washing the corners (kept dim now) */}
			<div aria-hidden="true" className="absolute inset-0">
				<div className="absolute -left-[12%] top-[4%] h-[62vmin] w-[62vmin] rounded-full bg-[radial-gradient(circle,rgba(226,229,234,0.06),transparent_66%)] blur-[60px]" />
				<div className="absolute -right-[14%] top-[34%] h-[56vmin] w-[56vmin] rounded-full bg-[radial-gradient(circle,rgba(214,218,224,0.05),transparent_66%)] blur-[70px]" />
				<div className="absolute bottom-[-16%] left-[26%] h-[64vmin] w-[64vmin] rounded-full bg-[radial-gradient(circle,rgba(236,238,241,0.05),transparent_68%)] blur-[70px]" />
			</div>

			{/* 3. the system: three fixed concentric circles — two fully on screen, the
			       third running off the edges. A loose circle orbits them, and each
			       ring carries a planet. Only the bodies ever move. */}
			<div aria-hidden="true" className="absolute inset-0">
				<div className="orbit orbit--1">
					<span className="orbit__ring" />
				</div>
				<div className="orbit orbit--2">
					<span className="orbit__ring" />
				</div>
				<div className="orbit orbit--3">
					<span className="orbit__ring" />
				</div>

				{/* planets circling the rings — a different radius and speed each */}
				<span className="orbit orbit--p1">
					<span className="orbit__planet orbit__planet--a" />
				</span>
				<span className="orbit orbit--p2">
					<span className="orbit__planet orbit__planet--b" />
				</span>
				<span className="orbit orbit--p3">
					<span className="orbit__planet orbit__planet--c" />
				</span>

				{/* the loose circle that orbits the three big ones, with one moon on it */}
				<span className="orbit orbit--loose">
					<span className="orbit__ring" />
					<span className="orbit__trail" />
				</span>

				{/* one wider body sweeping right around all three circles */}
				<span className="orbit orbit--outer">
					<span className="orbit__planet orbit__planet--outer" />
				</span>
			</div>

			{/* 4. deep vignette: pulls the focus to the centre and protects contrast */}
			<div
				aria-hidden="true"
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(120% 95% at 50% 42%, transparent 48%, rgba(5,5,6,0.32) 78%, rgba(4,4,5,0.72) 100%)"
				}}
			/>

			{/* 5. grain: sits above the blur, so the texture stays crisp */}
			<div
				aria-hidden="true"
				className="absolute inset-0 opacity-[0.42] mix-blend-overlay"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")"
				}}
			/>

			{/* 6. a second, coarser grain pass so the dark areas still feel alive */}
			<div
				aria-hidden="true"
				className="absolute inset-0 opacity-[0.2] mix-blend-soft-light"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23c)'/%3E%3C/svg%3E\")"
				}}
			/>
		</div>
	);
}
