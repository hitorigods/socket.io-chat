'use client';

import React, { FormEventHandler, useState } from 'react';
import { useAtom } from 'jotai';

import { atomSocket, atomEditedChat, atomIsEditedChat } from '@/stores/atoms';
import { useMutateChat } from '@/hooks/useQueryChats';
import { FetchChat } from '@/schemas/chat';
import InputButton from '@/components/InputButton';

type Props = {
	stateUserName: string;
};

export default function ChatForm({ stateUserName }: Props) {
	const [stateSocket] = useAtom(atomSocket);
	const [stateEditedChat, setStateEditedChat] = useAtom(atomEditedChat);
	const [stateIsEditedChat, setStateIsEditedChat] = useAtom(atomIsEditedChat);
	const { createMutationChat } = useMutateChat();

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		if (!stateEditedChat) return;

		if (stateIsEditedChat) {
			// const newChat = { ...chat, title: editedTitle };
			// updateMutationChat.mutate(newChat);
			// setEditedTitle('');
		} else {
			const newChat: Omit<FetchChat, 'id' | 'createdAt' | 'updatedAt'> = {
				title: stateEditedChat,
				published: true,
				// TODO: ログイン中のユーザーIDを設定する
				user_id: 'e597b29d-1aa4-4291-8829-9d985350dade',
				// TODO: チャットにルームIDを格納し設定する
				room_id: crypto.randomUUID(),
			};
			console.log('newChat: ', newChat);

			createMutationChat.mutate(newChat);

			stateSocket.emit('socket:chat', newChat);
			console.log(`send client: chat: ${newChat}`);
		}
		setStateEditedChat('');
	};

	return (
		<section className="">
			<form
				onSubmit={handleSubmit}
				className="grid place-items-center"
			>
				<InputButton
					label={stateIsEditedChat ? '編集' : '投稿'}
					name="name"
					placeholder="メッセージを入力してください"
					value={stateEditedChat}
					disabled={!stateEditedChat}
					onChange={(e) => setStateEditedChat(e.target.value)}
				/>
			</form>
		</section>
	);
}
