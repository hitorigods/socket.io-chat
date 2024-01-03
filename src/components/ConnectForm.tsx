'use client';

import { ChangeEventHandler, FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import { useAtom } from 'jotai';
// import { useQueryClient, QueryClient } from '@tanstack/react-query';

import InputButton from '@/components/InputButton';
import { atomSocket, atomUserName } from '@/stores/atoms';
import { FetchChat } from '@/schemas/chat';
// import { useMutateChat } from '@/hooks/useQueryChats';

const initializer = (
	socket: any
	// createMutationChat: any,
	// queryClient: QueryClient
) => {
	socket.on('connect', () => {
		console.log('Connected to the server');
	});

	socket.on('disconnect', () => {
		console.log('Disconnected from the server');
	});

	socket.on(
		'socket:chat',
		(newChat: Omit<FetchChat, 'id' | 'createdAt' | 'updatedAt'>) => {
			console.log(`ConnectForm received: ${newChat.title}`);
			// チャット更新はuseQuery側でするのとサーバー側でDBに保存するのでコメントアウト
			// createMutationChat.mutate(newChat);
		}
	);
};

export default function ConnectForm() {
	// const { createMutationChat } = useMutateChat();

	const [stateUserName, setStateUserName] = useAtom(atomUserName);
	const [, setStateSocket] = useAtom(atomSocket);
	const router = useRouter();
	// const queryClient = useQueryClient();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		const SocketHandler = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/api/sockets`,
			{ method: 'POST' }
		);

		const socket = io({ autoConnect: false });
		socket.connect();
		initializer(socket);
		// initializer(socket, createMutationChat, queryClient);
		setStateSocket(socket);

		router.push('/rooms');
	};

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		event.preventDefault();
		setStateUserName(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<InputButton
				label="接続"
				name="name"
				placeholder="表示名を入力してください"
				value={stateUserName}
				disabled={!stateUserName}
				onChange={handleChange}
			/>
		</form>
	);
}
