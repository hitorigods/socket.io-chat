'use client';

import React, { FormEventHandler, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { messageBoardAtom, socketAtom, userNameAtom } from '@/stores/atoms';

import { Message } from '@/models/message';
import InputButton from '@/components/InputButton';

export default function MessageList() {
	const [message, setMessage] = useState<string>('');

	const [messageBoard] = useAtom(messageBoardAtom);
	const [userName] = useAtom(userNameAtom);
	const [socket] = useAtom(socketAtom);

	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		if (!message) return;

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
			<div className="grid gap-[50px]">
				{messageBoard.length > 0 && (
					<section>
						<ul className="grid gap-[1px] overflow-hidden rounded shadow-md">
							{messageBoard.map((message: Message) => (
								<li
									key={message.id}
									className="bg-dark p-4 text-white transition-all duration-300 ease-in-out"
								>
									{message.author}:{message.body}
								</li>
							))}
						</ul>
					</section>
				)}
				<section className="">
					<form onSubmit={handleSubmit}>
						<InputButton
							label="送信"
							name="name"
							placeholder="メッセージを入力してください"
							value={message}
							disabled={!message}
							onChange={(e) => setMessage(e.target.value)}
						/>
					</form>
				</section>
			</div>
		</>
	);
}
