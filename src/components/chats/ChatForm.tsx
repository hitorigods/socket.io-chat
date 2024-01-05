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
import { UpdateChat } from '@/schemas/chats';
import { UserSchema } from '@/schemas/users';
import InputButton from '@/components/InputButton';

type Props = {
	stateUser: UserSchema;
	chatsRefetch: () => void;
};

export default function ChatForm({ stateUser, chatsRefetch }: Props) {
	const { createChatMutation, updateChatMutation } = useChatMutate();
	const [stateSocket] = useAtom(atomSocket);
	const [stateInputChat, setStateInputChat] = useAtom(atomInputChat);
	const [stateEditedChat] = useAtom(atomEditedChat);
	const [stateIsEditedChat, setStateIsEditedChat] = useAtom(atomIsEditedChat);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		if (!stateInputChat) return;

		if (stateIsEditedChat) {
			if (!stateEditedChat) return;
			// 編集中のチャットを取得しtitleを入力内容に置き換えデータベースを更新する
			const { id, title, published, Profile_id, Room_id, User_id } =
				stateEditedChat;
			const updateChat: UpdateChat = {
				id,
				title: stateInputChat,
				published,
				Profile_id,
				Room_id,
				User_id,
			};
			await updateChatMutation.mutate(updateChat);
		} else {
			const updateChat = {
				title: stateInputChat,
				published: true,
				// ログイン中のユーザーIDを設定する
				User_id: stateUser.id,
				Profile_id: stateUser.Profile_id,
				// TODO: チャットにルームIDを格納し設定する
				Room_id: '00000000-0000-0000-0000-000000000000',
			};
			await createChatMutation.mutate(updateChat);
		}

		stateSocket.emit('socket:chat', stateInputChat);
		console.log(`send client: chat: ${stateInputChat}`);

		//  チャット投稿後にリフェッチする
		const log = chatsRefetch();
		console.log('ChatForm log', log);

		setStateInputChat('');
		setStateIsEditedChat(false);
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
