import React from 'react';
import { useRouter } from 'next/navigation';

import { useSocketClient } from '@/features/sockets/useSocketClient';

export function useRoomEnter() {
	const router = useRouter();
	const { socketClientConnect } = useSocketClient();

	const handleSubmit: React.FormEventHandler<
		HTMLFormElement | HTMLButtonElement
	> = async (event) => {
		event.preventDefault();
		await socketClientConnect();
		router.push('/rooms');
	};
	return {
		handleSubmit,
	};
}
