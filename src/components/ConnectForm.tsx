'use client';

import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { atomSocket } from '@/stores/atoms';
import InputButton from '@/components/InputButton';

export default function ConnectForm() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [, setStateSocket] = useAtom(atomSocket);
	const [roomName, setRoomName] = useState('');

	const initializer = async (socket: any) => {
		socket.on('connect', () => {
			console.log('Connected to the server');
		});

		socket.on('disconnect', () => {
			console.log('Disconnected from the server');
		});

		socket.on('socket:chat', (data: String) => {
			console.log(`received: ${data}`);

			setTimeout(async () => {
				// TODO: ここでrefetchする
				const log = await queryClient.refetchQueries({
					queryKey: ['query:chats'],
					type: 'active',
					exact: true,
				});
				console.log('ConnectForm log', log);
			}, 100);
		});
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		const SocketHandler = await fetch(
			`${process.env.NEXT_PUBLIC_SITE_URL}/api/sockets`,
			{ method: 'POST' }
		);

		const socket = io({ autoConnect: false });
		socket.connect();

		initializer(socket);
		setStateSocket(socket);

		router.push('/rooms');
	};

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		event.preventDefault();
		setRoomName(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<InputButton
				label="接続"
				name="name"
				placeholder="表示名を入力してください"
				value={roomName}
				disabled={!roomName}
				onChange={handleChange}
			/>
		</form>
	);
}
