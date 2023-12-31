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
			<label className="block overflow-hidden rounded bg-white">
				<input
					className="bg-transparent p-3"
					name="name"
					placeholder="表示名を入力してください"
					value={userName}
					onChange={handleChange}
					autoComplete={'off'}
				/>
				<button className="w-[75px] bg-primary px-4 py-3 text-lg font-bold tracking-widest text-white hover:bg-secondary">
					接続
				</button>
			</label>
		</form>
	);
}
