import React from "react";
import BGTile from "@/app/components/ui/BGTile";
import Image from "next/image";

interface TileProps {
	title?: string;
	children: React.ReactNode;
	customClassName?: string;
	onClick?: () => void;
	bottomRightCorner?: "arrow" | "";
}

export default function Tile({
	title = "",
	children,
	customClassName = "",
	onClick,
	bottomRightCorner = ""
}: TileProps) {
	const imageSrc =
		bottomRightCorner === "arrow" ? "/general/Arrow_right.png" : null;

	return (
		<div
			className={`relative rounded-[35px] p-3 md:p-5 w-full h-full group ${customClassName}`}
			onClick={onClick}
		>
			{/* Background layer */}
			<BGTile />
			{/* Content layer */}
			<div className="relative opacity-90 flex flex-col h-full">
				{title && <h1>{title}</h1>}
				<div className="w-full h-full relative">{children}</div>
			</div>
			{imageSrc && (
				<div
					className={`h-[4vh] w-[4vh] absolute bottom-4 right-4 ${
						bottomRightCorner === "arrow"
							? "opacity-100"
							: "md:opacity-40 md:group-hover:opacity-100"
					} duration-150`}
				>
					<Image
						src={imageSrc}
						alt={bottomRightCorner}
						fill
						sizes="40px"
						style={{ objectFit: "contain" }}
					/>
				</div>
			)}
		</div>
	);
}
