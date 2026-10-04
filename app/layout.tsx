import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import BGDepth from "@/app/components/ui/BGDepth";
import { ScrollProvider } from "@/app/utils/ScrollContext";
import AnimatedWrapper from "@/app/utils/AnimatedWrapper";
import AnalyticsWrapper from "./utils/AnalyticsWrapper";
import CRTFilter from "@/app/components/ui/CRTFilter";
import ScreenCurve from "@/app/components/ui/ScreenCurve";
import Preloader from "@/app/components/ui/Preloader";
import ContentReveal from "@/app/components/ui/ContentReveal";
import { LoadingProvider } from "@/app/utils/LoadingContext";

const exo = Exo({
	variable: "--font-exo",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "Calvin Chiffot - Portfolio",
	description: "Portfolio Calvin Chiffot Full-Stack Dev",
	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{
				url: "/favicon_io/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png"
			},
			{
				url: "/favicon_io/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png"
			}
		],
		apple: [{ url: "/favicon_io/apple-touch-icon.png" }],
		other: [
			{
				url: "/favicon_io/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png"
			},
			{
				url: "/favicon_io/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png"
			}
		]
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className={`${exo.variable} antialiased`}>
				<LoadingProvider>
					{/* Three independent screen effects, nested outermost first — remove
					    either one on its own:
					      ScreenCurve = convex-glass curvature (barrel warp)
					      CRTFilter   = static pixel grid (scanlines + RGB subpixels)
					    `ScreenTilt.tsx` (perspective + rotateX) is kept on disk but not
					    mounted — wrap it around CRTFilter to bring the tilt back.
					    The preloader sits inside them so both effects are live from the
					    first frame; only the content (not the background) waits. */}
					<ScreenCurve>
						<CRTFilter>
							<AnalyticsWrapper>
								<ContentReveal>
									<AnimatedWrapper>
										<ScrollProvider>{children}</ScrollProvider>
									</AnimatedWrapper>
								</ContentReveal>
								<BGDepth />
							</AnalyticsWrapper>
							<Preloader />
						</CRTFilter>
					</ScreenCurve>
				</LoadingProvider>
			</body>
		</html>
	);
}
