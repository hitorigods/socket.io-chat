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
			<div className="grid gap-[50px]">
				{messageBoard.length > 0 && (
					<section>
						<ul className="grid gap-[1px] overflow-hidden rounded shadow-md">
							{messageBoard.map((message: Message) => (
								<li
									key={message.id}
									className="duration-350 bg-white px-4 py-2 transition-all ease-in-out"
								>
									{message.author}:{message.body}
								</li>
							))}
						</ul>
					</section>
				)}
				<section className="">
					<form onSubmit={handleSubmit}>
						<label className="block overflow-hidden rounded bg-white">
							<input
								className="bg-transparent p-3"
								name="name"
								placeholder="メッセージを入力してください"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								autoComplete={'off'}
							/>
							<button className="w-[75px] bg-secondary px-4 py-3 text-lg font-bold tracking-widest text-white hover:bg-primary">
								送信
							</button>
						</label>
					</form>
				</section>
			</div>
		</>
	);
}
