'use client';

import { ChangeEventHandler, FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { io } from 'socket.io-client';

import Message from '@/models/message';
import { messageBoardAtom, socketAtom, userNameAtom } from '@/stores/atoms';
import InputButton from '@/components/InputButton';

export default function ConnectionForm() {
	const [userName, setUserName] = useAtom(userNameAtom);
	const [, setMessageBoard] = useAtom(messageBoardAtom);
	const [, setSocket] = useAtom(socketAtom);

	const router = useRouter();

	const socketInitializer = (socket: any) => {
		socket.on('connect', () => {
			console.log('Connected to the server');
		});

		socket.on('disconnect', () => {
			console.log('Disconnected from the server');
		});

		socket.on('message', (newMessage: Message) => {
			setMessageBoard((messageBoard) => {
				const newMessageBoard = Array.from(
					new Map(messageBoard.map((message) => [message.id, message])).values()
				);
				newMessageBoard.push(newMessage);
				return newMessageBoard;
			});
		});
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/sockets', {
			method: 'POST',
		});

		const socket = io({ autoConnect: false });
		socket.connect();
		socketInitializer(socket);
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
