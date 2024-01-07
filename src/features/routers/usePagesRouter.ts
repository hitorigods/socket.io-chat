'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export function usePagesRouter() {
	const router = useRouter();

	const handleRouterHome: React.MouseEventHandler<HTMLButtonElement> = (
		event
	) => {
		event.preventDefault();
		router.push('/');
	};

	const handleRouterProfile: React.MouseEventHandler<HTMLButtonElement> = (
		event
	) => {
		event.preventDefault();
		router.push('/profile');
	};

	return {
		handleRouterHome,
		handleRouterProfile,
	};
}
