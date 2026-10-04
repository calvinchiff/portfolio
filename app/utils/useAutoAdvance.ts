"use client";

import { useEffect, useRef } from "react";

/**
 * Runs `onAdvance` once after `durationMs`, but only while `active` is true, and
 * restarts whenever `active` flips or `resetKey` changes (e.g. the user picked
 * another slide). The visual countdown is a CSS animation of the same duration
 * (`auto-progress-x` / `auto-progress-y`), so the two stay in sync without a
 * re-render on every frame.
 */
export function useAutoAdvance({
	active,
	durationMs,
	onAdvance,
	resetKey
}: {
	active: boolean;
	durationMs: number;
	onAdvance: () => void;
	resetKey: unknown;
}) {
	const callback = useRef(onAdvance);
	callback.current = onAdvance;

	useEffect(() => {
		if (!active) return;
		const id = window.setTimeout(() => callback.current(), durationMs);
		return () => window.clearTimeout(id);
	}, [active, durationMs, resetKey]);
}
