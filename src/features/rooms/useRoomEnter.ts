import React from 'react';
import { useRouter } from 'next/navigation';

import { useSocketClient } from '@/features/sockets/useSocketClient';

type Props = {
	roomId: string;
};

export function useRoomEnter({ roomId }: Props) {
	const router = useRouter();
	const { socketClientConnect } = useSocketClient({ roomId });

	const handleSubmit: React.FormEventHandler<
		HTMLFormElement | HTMLButtonElement
	> = async (event) => {
		event.preventDefault();
		await socketClientConnect();
		router.push(`/rooms/${roomId}`);
	};
	return {
		handleSubmit,
	};
}
