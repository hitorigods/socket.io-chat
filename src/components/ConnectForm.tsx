'use client';

import { ChangeEventHandler, FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { io } from 'socket.io-client';

import { roomChatsAtom, socketAtom, userNameAtom } from '@/stores/atoms';
import InputButton from '@/components/InputButton';
import { SchemaChat, SetChats } from '@/schemas/chat';

const initializer = (socket: any, setRoomChats: SetChats) => {
	socket.on('connect', () => {
		console.log('Connected to the server');
	});

	socket.on('disconnect', () => {
		console.log('Disconnected from the server');
	});

	socket.on('chat', (newChat: SchemaChat) => {
		setRoomChats((roomChats: SchemaChat[]) => {
			const newroomChats = Array.from(
				new Map(roomChats.map((chat) => [chat.id, chat])).values()
			);
			newroomChats.push(newChat);
			return newroomChats;
		});
	});
};

export default function ConnectForm() {
	const [userName, setUserName] = useAtom(userNameAtom);
	const [, setRoomChats] = useAtom(roomChatsAtom);
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
		initializer(socket, setRoomChats);
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
