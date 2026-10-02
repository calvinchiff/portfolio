"use client";

import { ReactNode } from "react";
import { BARREL_MAP_DATA_URI } from "@/app/components/ui/crtBarrelMap";

/**
 * Convex-screen barrel warp — deliberately on its own, with no CRT overlay, so
 * the curve can be kept even if the CRT filter goes away (and vice versa).
 *
 * An SVG `feDisplacementMap` fed by `crtBarrelMap.ts` pushes the pixels the way a
 * convex tube does: the centre stays put and the edges are pulled outward, so
 * straight lines bow. Two details make it work:
 *   - `colorInterpolationFilters="sRGB"` — without it the map's neutral 128 is
 *     remapped and the whole page shifts;
 *   - the displacement reads slightly outside the frame, so the content is
 *     overscanned (`OVERSCAN`) and the filter region is grown to 112%; the
 *     wrapper then crops the excess. `OVERSCAN` must cover at least
 *     `BARREL_SCALE / 2` of vertical pull or the edges show gaps.
 */
const BARREL = true;
/** Maximum offset at the corners, in px (half of it in the middle of an edge). */
const BARREL_SCALE = 68;
/** Overscan that feeds the reading outside the frame (must cover SCALE / 2). */
const OVERSCAN = 1.09;

export default function ScreenCurve({ children }: { children: ReactNode }) {
	return (
		<div className="screen-curve">
			<div className={BARREL ? "screen-curve__warp" : "screen-curve__plate"}>
				<div
					className="screen-curve__inner"
					style={BARREL ? { transform: `scale(${OVERSCAN})` } : undefined}
				>
					{children}
				</div>
			</div>

			{/* The map travels with the component so the filter is exact everywhere. */}
			<svg aria-hidden="true" className="screen-curve__defs">
				<defs>
					<filter
						id="screen-curve-barrel"
						x="-6%"
						y="-6%"
						width="112%"
						height="112%"
						colorInterpolationFilters="sRGB"
					>
						<feImage
							href={BARREL_MAP_DATA_URI}
							x="0"
							y="0"
							width="100%"
							height="100%"
							preserveAspectRatio="none"
							result="map"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="map"
							scale={BARREL_SCALE}
							xChannelSelector="R"
							yChannelSelector="G"
						/>
					</filter>
				</defs>
			</svg>

			<style jsx>{`
				.screen-curve {
					position: relative;
					min-height: 100dvh;
					/* crops the overscan, and nothing else */
					overflow: hidden;
				}

				.screen-curve__warp {
					filter: url(#screen-curve-barrel);
				}

				.screen-curve__plate,
				.screen-curve__inner {
					position: relative;
				}

				.screen-curve__defs {
					position: absolute;
					width: 0;
					height: 0;
					overflow: hidden;
				}
			`}</style>
		</div>
	);
}
