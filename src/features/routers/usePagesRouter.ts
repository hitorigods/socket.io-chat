'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { chatEditedAtom, isChatEditedAtom } from '@/features/chats/chatAtom';
import { socketAtom } from '@/features/sockets/socketAtoms';

export function usePagesRouter() {
	const router = useRouter();

	const [socketState] = useAtom(socketAtom);
	const [, setChatEditedState] = useAtom(chatEditedAtom);
	const [, setIsChatEditedState] = useAtom(isChatEditedAtom);

	const resetStatus = () => {
		socketState?.disconnect();
		setChatEditedState(null);
		setIsChatEditedState(false);
	};

	const handleRouterHome: React.MouseEventHandler<HTMLButtonElement> = (
		event
	) => {
		event.preventDefault();
		resetStatus();
		router.push('/');
	};

	const handleRouterProfile: React.MouseEventHandler<HTMLButtonElement> = (
		event
	) => {
		event.preventDefault();
		resetStatus();
		router.push('/profile');
	};

	return {
		handleRouterHome,
		handleRouterProfile,
	};
}
