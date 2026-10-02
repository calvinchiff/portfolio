import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import BGDepth from "@/app/components/ui/BGDepth";
import { ScrollProvider } from "@/app/utils/ScrollContext";
import AnimatedWrapper from "@/app/utils/AnimatedWrapper";
import AnalyticsWrapper from "./utils/AnalyticsWrapper";
import CRTFilter from "@/app/components/ui/CRTFilter";

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
				<CRTFilter>
					<AnalyticsWrapper>
						<AnimatedWrapper>
							<ScrollProvider>{children}</ScrollProvider>
						</AnimatedWrapper>
						<BGDepth />
					</AnalyticsWrapper>
				</CRTFilter>
			</body>
		</html>
	);
}
