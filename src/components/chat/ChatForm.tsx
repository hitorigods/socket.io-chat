'use client';

import React, { FormEventHandler, useState } from 'react';
import { useAtom } from 'jotai';

import { socketAtom } from '@/stores/atoms';
import InputButton from '@/components/InputButton';
import { SchemaChat } from '@/schemas/chat';

type Props = {
	userName: string;
};

export default function ChatForm({ userName }: Props) {
	const [socket] = useAtom(socketAtom);
	const [chat, setChat] = useState<string>('');

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		if (!chat) return;

		const sendChat: SchemaChat = {
			id: crypto.randomUUID(),
			room: 1,
			author: userName,
			body: chat,
		};

		socket.emit('chat', sendChat);
		console.log(`send client: chat: ${sendChat}`);

		setChat('');
	};

	return (
		<section className="">
			<form
				onSubmit={handleSubmit}
				className="grid place-items-center"
			>
				<InputButton
					label="送信"
					name="name"
					placeholder="メッセージを入力してください"
					value={chat}
					disabled={!chat}
					onChange={(e) => setChat(e.target.value)}
				/>
			</form>
		</section>
	);
}
