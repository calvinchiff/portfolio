"use client";

import { ReactNode } from "react";

/**
 * Screen tilt, on its own so it can be dropped without touching the curvature
 * (`ScreenCurve`) or the CRT pixels (`CRTFilter`).
 *
 * The same numbers the original CRTFilter used: a 2° rotation around X behind an
 * 800px perspective, which makes the top of the screen recede a little.
 *
 * Note: a `transform` makes this element the containing block of its `fixed`
 * children (the nav and the background). The wrapper is 100dvh, so they still
 * land where they used to.
 */
const TILT = true;
/** Tilt around X, in degrees. */
const TILT_DEG = 2;
/** Perspective that turns the rotation into depth. */
const PERSPECTIVE = 800;

export default function ScreenTilt({ children }: { children: ReactNode }) {
	return (
		<div
			className="screen-tilt"
			style={
				TILT
					? { transform: `perspective(${PERSPECTIVE}px) rotateX(${TILT_DEG}deg)` }
					: undefined
			}
		>
			{children}
		</div>
	);
}
