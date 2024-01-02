'use client';

import React, { FormEventHandler, useState } from 'react';
import { useAtom } from 'jotai';

import { socketAtom } from '@/stores/atoms';
import InputButton from '@/components/InputButton';
import { FetchChat } from '@/schemas/chat';

type Props = {
	userName: string;
};

export default function ChatForm({ userName }: Props) {
	const [socket] = useAtom(socketAtom);
	const [inputChat, setInputChat] = useState<string>('');

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		if (!inputChat) return;

		const newChat: Omit<FetchChat, 'id' | 'createdAt' | 'updatedAt'> = {
			title: inputChat,
			published: true,
			// TODO: ログイン中のユーザーIDを設定する
			user_id: 'e597b29d-1aa4-4291-8829-9d985350dade',
			// TODO: チャットにルームIDを格納し設定する
			room_id: crypto.randomUUID(),
		};

		socket.emit('chat', newChat);
		console.log(`send client: chat: ${newChat}`);

		setInputChat('');
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
					value={inputChat}
					disabled={!inputChat}
					onChange={(e) => setInputChat(e.target.value)}
				/>
			</form>
		</section>
	);
}
