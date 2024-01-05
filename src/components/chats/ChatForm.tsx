'use client';

import React, { FormEventHandler } from 'react';
import { useAtom } from 'jotai';

import {
	atomSocket,
	atomInputChat,
	atomEditedChat,
	atomIsEditedChat,
} from '@/stores/atoms';
import { useChatMutate } from '@/hooks/useChatMutate';
import { FetchChat } from '@/schemas/chats';
import { UserSchema } from '@/schemas/users';
import InputButton from '@/components/InputButton';

type Props = {
	stateUser: UserSchema;
};

export default function ChatForm({ stateUser }: Props) {
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
				// ログイン中のユーザーIDを設定する
				User_id: stateUser.id,
				// TODO: チャットにルームIDを格納し設定する
				Room_id: '00000000-0000-0000-0000-000000000000',
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
