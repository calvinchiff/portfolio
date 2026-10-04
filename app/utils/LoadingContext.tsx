"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
	/** True once every image has been loaded and decoded. */
	ready: boolean;
	setReady: (ready: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
	ready: false,
	setReady: () => {}
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
	const [ready, setReady] = useState(false);
	return (
		<LoadingContext.Provider value={{ ready, setReady }}>
			{children}
		</LoadingContext.Provider>
	);
};

export const useLoading = () => useContext(LoadingContext);
