'use client';

import React, { FormEventHandler, useState } from 'react';
import { useAtom } from 'jotai';

import {
	atomSocket,
	atomInputChat,
	atomEditedChat,
	atomIsEditedChat,
} from '@/stores/atoms';
import { useMutateChat } from '@/hooks/useQueryChats';
import { FetchChat } from '@/schemas/chat';
import InputButton from '@/components/InputButton';

type Props = {
	stateUserName: string;
};

export default function ChatForm({ stateUserName }: Props) {
	const { updateMutationChat } = useMutateChat();
	const [stateSocket] = useAtom(atomSocket);
	const [stateInputChat, setStateInputChat] = useAtom(atomInputChat);
	const [stateEditedChat, setStateEditedChat] = useAtom(atomEditedChat);
	const [stateIsEditedChat, setStateIsEditedChat] = useAtom(atomIsEditedChat);
	const { createMutationChat } = useMutateChat();

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		console.log('stateInputChat: ', stateInputChat);
		console.log('stateEditedChat: ', stateEditedChat);
		if (!stateInputChat) return;

		if (stateIsEditedChat) {
			if (!stateEditedChat) return;
			// 編集中のチャットを取得しtitleを入力内容に置き換えデータベースを更新する
			const newChat = { ...stateEditedChat, title: stateInputChat };
			updateMutationChat.mutate(newChat);
			setStateInputChat('');
			setStateIsEditedChat(false);
		} else {
			const newChat: Omit<FetchChat, 'id' | 'createdAt' | 'updatedAt'> = {
				title: stateInputChat,
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
		setStateInputChat('');
	};

	return (
		<section className="">
			<form
				onSubmit={handleSubmit}
				className="grid place-items-center"
			>
				<InputButton
					label={stateIsEditedChat ? '更新' : '投稿'}
					name="name"
					placeholder="メッセージを入力してください"
					value={stateInputChat}
					disabled={!stateInputChat}
					isEdited={stateIsEditedChat}
					onChange={(event) => setStateInputChat(event.target.value)}
				/>
			</form>
		</section>
	);
}
