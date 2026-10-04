"use client";

import { useEffect, useRef } from "react";

const TEXT_TAGS = [
	"H1",
	"H2",
	"H3",
	"H4",
	"H5",
	"H6",
	"P",
	"SPAN",
	"LI",
	"A",
	"STRONG",
	"EM",
	"LABEL",
	"BUTTON"
];

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

/** Last value this module wrote into a text node, to ignore our own frames. */
const lastWritten = new WeakMap<CharacterData, string>();
/** Canceller of the running scramble for an element. */
const activeScramble = new WeakMap<HTMLElement, () => void>();

/**
 * Scramble letters until the final text is revealed.
 *
 * NOTE: it writes into the *existing* text node instead of `el.textContent`.
 * Replacing the content detaches React's text nodes, and React then keeps
 * updating nodes that are no longer in the document — which used to freeze a
 * translated line in its previous language. Multi-node elements (text mixed
 * with child elements) are left alone for the same reason.
 */
const scrambleText = (el: HTMLElement, duration = 700) => {
	if (el.childNodes.length !== 1) return;
	const firstChild = el.firstChild;
	if (!firstChild || firstChild.nodeType !== Node.TEXT_NODE) return;
	const textNode = firstChild as CharacterData;

	const finalText = textNode.nodeValue ?? "";
	if (!finalText.trim()) return;

	// A new text arrived while the previous scramble was running: restart it.
	activeScramble.get(el)?.();

	const iterations = Math.max(8, Math.round((duration / 1000) * 60));
	let frame = 0;
	let raf = 0;
	let cancelled = false;

	const step = () => {
		if (cancelled) return;

		const pct = frame / iterations;
		const displayed = finalText
			.split("")
			.map((ch, i) =>
				i < pct * finalText.length
					? ch
					: CHARS[Math.floor(Math.random() * CHARS.length)]
			)
			.join("");

		textNode.nodeValue = displayed;
		lastWritten.set(textNode, displayed);

		if (frame++ < iterations) {
			raf = requestAnimationFrame(step);
		} else {
			textNode.nodeValue = finalText;
			lastWritten.set(textNode, finalText);
			activeScramble.delete(el);
		}
	};

	activeScramble.set(el, () => {
		cancelled = true;
		cancelAnimationFrame(raf);
	});
	step();
};

export default function AnimatedWrapper({
	children,
	animationClass = "fade-in-text",
	className = ""
}: {
	children: React.ReactNode;
	animationClass?: string;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const root = ref.current;
		if (!root) return;

		const animate = (node: Node) => {
			if (!(node instanceof HTMLElement)) return;
			if (!TEXT_TAGS.includes(node.tagName)) return;

			node.classList.remove(animationClass);
			void node.offsetWidth;
			node.classList.add(animationClass);

			scrambleText(node, 700); // 🔧 use the hardcoded duration
		};

		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach(animate);

				if (mutation.type === "characterData") {
					const target = mutation.target as CharacterData;
					// Skip the frames this module wrote itself.
					if (lastWritten.get(target) === target.nodeValue) return;
					const parent = target.parentElement;
					if (parent && TEXT_TAGS.includes(parent.tagName)) animate(parent);
				}
			});
		});

		observer.observe(root, {
			childList: true,
			subtree: true,
			characterData: true
		});

		return () => observer.disconnect();
	}, [animationClass]);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
