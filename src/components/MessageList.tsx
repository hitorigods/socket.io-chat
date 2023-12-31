'use client';

import React, { FormEventHandler, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { atomMessageBoard, atomSocket, atomUserName } from '@/stores/atoms';

import Message from '@/models/message';

export default function MessageList() {
	const [message, setMessage] = useState<string>('');

	const [messageBoard] = useAtom(atomMessageBoard);
	const [userName] = useAtom(atomUserName);
	const [socket] = useAtom(atomSocket);

	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		const sendMessage: Message = {
			id: crypto.randomUUID(),
			room: 1,
			author: userName,
			body: message,
		};

		socket.emit('message', sendMessage);
		setMessage('');
	};

	useEffect(() => {
		if (!userName) router.push('/');
	}, [router, userName]);

	return (
		<>
			<section>
				<form onSubmit={handleSubmit}>
					<input
						className="border border-gray-400 p-2"
						name="message"
						placeholder="enter your message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						autoComplete={'off'}
					/>
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Send
					</button>
				</form>
			</section>
			<section>
				<ul>
					{messageBoard.map((message: Message) => (
						<li key={message.id}>
							{message.author}:{message.body}
						</li>
					))}
				</ul>
			</section>
		</>
	);
}