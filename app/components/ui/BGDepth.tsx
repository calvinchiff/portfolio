// components/BGDepth.tsx

"use client";

import { useEffect, useRef } from "react";

/**
 * Animated deep-colour background.
 *
 * Replaces the old WebGL topographic waves with a cheap 2D canvas colour field.
 * Two gradient stops drift through a list of deep pairings — indigo/violet,
 * violet/blood, blood/emerald, emerald/indigo — so any given screenful holds a
 * couple of rich, dark tones: never black, never bright. A slow sine warp keeps
 * the bands organic. The canvas renders at 1/8 resolution and is scaled up with
 * a heavy CSS blur, which keeps it smooth and battery friendly.
 */

type Rgb = [number, number, number];

/**
 * The four deep tints, given as the fraction of each channel at full strength.
 * The gradient gently lerps between them, so the screen always sits in a
 * combination of deep jewel tones and never washes out to white.
 */
const DEEP_INDIGO: Rgb = [0.22, 0.26, 0.92];
const DEEP_VIOLET: Rgb = [0.62, 0.18, 0.94];
const DEEP_EMERALD: Rgb = [0.08, 0.62, 0.5];
const DEEP_CRIMSON: Rgb = [0.86, 0.16, 0.38];

/** Deep pairings the gradient travels through. */
const PAIRS: { a: Rgb; b: Rgb }[] = [
	{ a: DEEP_INDIGO, b: DEEP_VIOLET },
	{ a: DEEP_VIOLET, b: DEEP_CRIMSON },
	{ a: DEEP_CRIMSON, b: DEEP_EMERALD },
	{ a: DEEP_EMERALD, b: DEEP_INDIGO }
];

/** Below this the canvas renders at 1/SCALE of the CSS size. */
const SCALE = 8;
/** Target frame rate — the motion is slow, 30fps is plenty. */
const FRAME_MS = 1000 / 30;

/** Overall depth: 1 = the palette above, lower = darker. */
const LEVEL = 0.8;
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

			// Two gradient stops travel through a list of deep pairings over a long
			// cycle — indigo/violet, violet/blood, blood/emerald, emerald/indigo —
			// so each screenful holds at most two jewel tones at a time.
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
			vignette.addColorStop(0, "rgba(3, 4, 9, 0)");
			vignette.addColorStop(0.62, "rgba(3, 4, 9, 0.08)");
			vignette.addColorStop(1, "rgba(2, 3, 6, 0.45)");
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
		<div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#05060b]">
			{/* 1. colour field: the drifting deep tones */}
			<canvas
				ref={canvasRef}
				aria-hidden="true"
				className="h-full w-full scale-[1.12] blur-[26px] md:blur-[56px]"
			/>

			{/* 2. structure: soft glows for depth and concentric rings for geometry */}
			<div aria-hidden="true" className="absolute inset-0">
				<div className="absolute -left-[12%] top-[4%] h-[62vmin] w-[62vmin] rounded-full bg-[radial-gradient(circle,rgba(150,120,255,0.30),transparent_66%)] blur-[60px]" />
				<div className="absolute -right-[14%] top-[34%] h-[56vmin] w-[56vmin] rounded-full bg-[radial-gradient(circle,rgba(60,80,220,0.26),transparent_66%)] blur-[70px]" />
				<div className="absolute bottom-[-16%] left-[26%] h-[64vmin] w-[64vmin] rounded-full bg-[radial-gradient(circle,rgba(30,150,130,0.22),transparent_68%)] blur-[70px]" />

				{/* concentric rings — large, hairline, deliberately off-centre */}
				<div className="absolute left-1/2 top-1/2 h-[158vmin] w-[158vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.10]" />
				<div className="absolute left-1/2 top-1/2 h-[112vmin] w-[112vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.075]" />
				<div className="absolute left-1/2 top-1/2 h-[74vmin] w-[74vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.055]" />
				<div className="absolute left-[68%] top-[22%] h-[34vmin] w-[34vmin] rounded-full border border-[#7c9dff]/[0.14]" />

				{/* a few crisp accents so the geometry doesn't read as mush */}
				<span className="absolute left-[18%] top-[30%] h-1.5 w-1.5 rounded-full bg-[#4fe3ff]/40" />
				<span className="absolute left-[76%] top-[64%] h-1 w-1 rounded-full bg-[#ffab4a]/40" />
				<span className="absolute left-[42%] top-[78%] h-[3px] w-[3px] rounded-full bg-white/30" />
			</div>

			{/* 3. deep vignette: pulls the focus to the centre and protects contrast */}
			<div
				aria-hidden="true"
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(120% 95% at 50% 42%, transparent 38%, rgba(4,5,10,0.42) 74%, rgba(3,4,8,0.82) 100%)"
				}}
			/>

			{/* 4. grain: sits above the blur, so the texture stays crisp */}
			<div
				aria-hidden="true"
				className="absolute inset-0 opacity-[0.34] mix-blend-overlay"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")"
				}}
			/>

			{/* 5. a touch of colour speckle so the dark areas still feel alive */}
			<div
				aria-hidden="true"
				className="absolute inset-0 opacity-[0.16] mix-blend-soft-light"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='3'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23c)'/%3E%3C/svg%3E\")"
				}}
			/>
		</div>
	);
}
