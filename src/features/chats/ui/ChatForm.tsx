'use client';

import { useLayoutEffect, FormEventHandler } from 'react';
import { useAtom } from 'jotai';

import {
	atomSocket,
	atomInputChat,
	atomEditedChat,
	atomIsEditedChat,
	atomSocketChat,
} from '@/stores/atoms';
import { useChatMutate } from '@/features/chats/useChatMutate';
import { UpdateChat } from '@/features/chats/chatSchemas';
import { UserSchema } from '@/features/users/userSchemas';
import FormInputSubmit from '@/components/forms/FormInputSubmit';

type Props = {
	stateUser: UserSchema;
};

export default function ChatForm({ stateUser }: Props) {
	const { createChatMutation, updateChatMutation } = useChatMutate();
	const [stateSocket] = useAtom(atomSocket);
	const [stateInputChat, setStateInputChat] = useAtom(atomInputChat);
	const [stateEditedChat] = useAtom(atomEditedChat);
	const [stateIsEditedChat, setStateIsEditedChat] = useAtom(atomIsEditedChat);
	const [stateSocketChat, setStateSocketChat] = useAtom(atomSocketChat);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		if (!stateInputChat) return;

		if (stateIsEditedChat) {
			if (!stateEditedChat) return;
			// 編集中のチャットを取得しtitleを入力内容に置き換えデータベースを更新する
			const { id, published } = stateEditedChat;
			const updateChat: UpdateChat = {
				id,
				title: stateInputChat,
				published,
			};
			await updateChatMutation.mutate(updateChat);
		} else {
			const updateChat = {
				title: stateInputChat,
				published: true,
				User_id: stateUser.id,
				Profile_id: stateUser.Profile_id,
				// TODO: チャットにルームIDを格納し設定する
				Room_id: '00000000-0000-0000-0000-000000000000',
			};
			await createChatMutation.mutate(updateChat);
		}

		// stateSocket.emit('socket:chat', stateSocketChat);
		// console.log('send client::chat:', stateSocketChat);

		setStateInputChat('');
		setStateIsEditedChat(false);
	};

	useLayoutEffect(() => {
		stateSocket?.emit('socket:chat', stateSocketChat);
		console.log('send client chat:', stateSocketChat);
	}, [stateSocketChat]);

	return (
		<section className="">
			<form
				onSubmit={handleSubmit}
				className="grid place-items-center"
			>
				<FormInputSubmit
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
