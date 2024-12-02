'use client'

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useModelsData } from '../../data/hooks/useSystemDynamicData';

const LoadingComponent = () => {
	return (
		<div className="fixed flex-col inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 gap-4">
			<p className="text-white text-wrap">Running System Dynamic Baseline Model</p>
			<Loader2 className="w-12 h-12 animate-spin text-secondary" />
		</div>
	)
}

export const SystemDynamicContainer: React.FC<React.PropsWithChildren> = ({ children }) => {

	// const modelsData = useModelsData()
	
	return (
		<div className='relative w-full h-screen'>
			{/* {modelsData?.data ? <>{children}</>: <LoadingComponent />} */}
			{children}
		</div>
	);
};
