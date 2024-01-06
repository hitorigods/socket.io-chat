'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { atomSocket, atomEditedChat, atomIsEditedChat } from '@/stores/atoms';

export function usePagesRouter() {
	const router = useRouter();

	const [stateSocket] = useAtom(atomSocket);
	const [, setStateEditedChat] = useAtom(atomEditedChat);
	const [, setStateIsEditedChat] = useAtom(atomIsEditedChat);

	const resetStatus = () => {
		stateSocket?.disconnect();
		setStateEditedChat(null);
		setStateIsEditedChat(false);
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
