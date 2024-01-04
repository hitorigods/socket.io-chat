'use client';

import React, { FormEventHandler, useState } from 'react';
import { useAtom } from 'jotai';

import {
	atomSocket,
	atomInputChat,
	atomEditedChat,
	atomIsEditedChat,
} from '@/stores/atoms';
import { useChatMutate } from '@/hooks/useChatMutate';
import { FetchChat } from '@/schemas/chat';
import InputButton from '@/components/InputButton';

type Props = {
	stateUserName: string;
};

export default function ChatForm({ stateUserName }: Props) {
	const { createChatMutation, updateChatMutation } = useChatMutate();
	const [stateSocket] = useAtom(atomSocket);
	const [stateInputChat, setStateInputChat] = useAtom(atomInputChat);
	const [stateEditedChat] = useAtom(atomEditedChat);
	const [stateIsEditedChat, setStateIsEditedChat] = useAtom(atomIsEditedChat);

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		if (!stateInputChat) return;

		if (stateIsEditedChat) {
			if (!stateEditedChat) return;
			// 編集中のチャットを取得しtitleを入力内容に置き換えデータベースを更新する
			const newChat = { ...stateEditedChat, title: stateInputChat };
			updateChatMutation.mutate(newChat);
			setStateInputChat('');
			setStateIsEditedChat(false);
		} else {
			const newChat: Omit<FetchChat, 'id' | 'createdAt' | 'updatedAt'> = {
				title: stateInputChat,
				published: true,
				// TODO: ログイン中のユーザーIDを設定する
				User_id: '6dd402f7-2dcf-473a-a863-71de78e35d7e',
				// TODO: チャットにルームIDを格納し設定する
				Room_id: crypto.randomUUID(),
			};
			createChatMutation.mutate(newChat);

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
