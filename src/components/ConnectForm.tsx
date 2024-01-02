'use client';

import { ChangeEventHandler, FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import { useAtom } from 'jotai';

import InputButton from '@/components/InputButton';
import { socketAtom, userNameAtom } from '@/stores/atoms';
import { FetchChat } from '@/schemas/chat';
import { useMutateChat } from '@/hooks/useQueryChats';

const initializer = (socket: any, createMutationChat: any) => {
	socket.on('connect', () => {
		console.log('Connected to the server');
	});

	socket.on('disconnect', () => {
		console.log('Disconnected from the server');
	});

	socket.on(
		'chat',
		(newChat: Omit<FetchChat, 'id' | 'createdAt' | 'updatedAt'>) => {
			createMutationChat.mutate(newChat);
		}
	);
};

export default function ConnectForm() {
	const { createMutationChat } = useMutateChat();

	const [userName, setUserName] = useAtom(userNameAtom);
	const [, setSocket] = useAtom(socketAtom);
	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		const SocketHandler = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/api/sockets`,
			{ method: 'POST' }
		);

		const socket = io({ autoConnect: false });
		socket.connect();
		initializer(socket, createMutationChat);
		setSocket(socket);

		router.push('/rooms');
	};

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		event.preventDefault();
		setUserName(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<InputButton
				label="接続"
				name="name"
				placeholder="表示名を入力してください"
				value={userName}
				disabled={!userName}
				onChange={handleChange}
			/>
		</form>
	);
}
