'use client';

import { ChangeEventHandler, FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { io } from 'socket.io-client';

import Message from '@/models/message';
import { atomMessageBoard, atomSocket, atomUserName } from '@/stores/atoms';

export default function ConnectionForm() {
	const [userName, setUserName] = useAtom(atomUserName);
	const [, setMessageBoard] = useAtom(atomMessageBoard);
	const [, setSocket] = useAtom(atomSocket);

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
			<input
				className="border border-gray-400 p-2"
				name="name"
				placeholder="enter your name"
				value={userName}
				onChange={handleChange}
				autoComplete={'off'}
			/>
			<button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
				Connect
			</button>
		</form>
	);
}
