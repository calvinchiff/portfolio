"use client";

import { ReactNode } from "react";

/**
 * CRT pixel texture — the visible-pixels effect only.
 *
 * Kept to the glass texture: 2px horizontal scanlines plus a 3px vertical RGB
 * subpixel stripe, which together read as a pixel grid. Everything that animated
 * is gone — the `flicker` overlay (that is what made content pulse half away and
 * reappear) and the animated `text-shadow` (the crackle). Nothing here moves, so
 * it costs nothing per frame.
 *
 * The tilt lives in `ScreenTilt` and the curve in `ScreenCurve`: each of the
 * three can be removed on its own in `app/layout.tsx`.
 */
export default function CRTFilter({ children }: { children: ReactNode }) {
	return (
		<div className="crt-container">
			<div className="crt-screen">{children}</div>
			<div className="crt-pixels" aria-hidden="true" />
			<style jsx>{`
				.crt-container,
				.crt-screen {
					position: relative;
				}

				/* static pixel grid: 2px scanlines + 3px RGB subpixels */
				.crt-pixels {
					position: absolute;
					inset: 0;
					z-index: 40;
					pointer-events: none;
					background-image: linear-gradient(
							rgba(18, 16, 16, 0) 50%,
							rgba(0, 0, 0, 0.25) 50%
						),
						linear-gradient(
							90deg,
							rgba(255, 0, 0, 0.06),
							rgba(0, 255, 0, 0.02),
							rgba(0, 0, 255, 0.06)
						);
					background-size: 100% 2px, 3px 100%;
				}
			`}</style>
		</div>
	);
}
