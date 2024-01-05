'use client';

import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import { useAtom } from 'jotai';

import { atomSocket, atomUser } from '@/stores/atoms';
import { FetchChat } from '@/schemas/chats';
import InputButton from '@/components/InputButton';

const initializer = (socket: any) => {
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
		}
	);
};

export default function ConnectForm() {
	const router = useRouter();
	const [stateUser, setStateUser] = useAtom(atomUser);
	const [, setStateSocket] = useAtom(atomSocket);
	const [roomName, setRoomName] = useState('');

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
