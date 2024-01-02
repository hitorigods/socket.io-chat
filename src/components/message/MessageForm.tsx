'use client';

import React, { FormEventHandler, useState } from 'react';
import { useAtom } from 'jotai';

import { socketAtom } from '@/stores/atoms';
import InputButton from '@/components/InputButton';
import { Message } from '@/schemas/message';

type Props = {
	userName: string;
};

export default function MessageForm({ userName }: Props) {
	const [socket] = useAtom(socketAtom);
	const [message, setMessage] = useState<string>('');

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

	return (
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
	);
}
