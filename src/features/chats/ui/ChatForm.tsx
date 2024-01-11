'use client';

import React, { useLayoutEffect } from 'react';
import { useAtom } from 'jotai';

import {
	chatInputAtom,
	chatEditedAtom,
	isChatEditedAtom,
	chatSocketAtom,
	isChatUpdatedAtom,
} from '@/features/chats/chatAtom';
import { socketAtom } from '@/features/sockets/socketAtoms';
import { useChatMutate } from '@/features/chats/useChatMutate';
import { UpdateChat } from '@/features/chats/chatSchemas';
import { UserSchema } from '@/features/users/userSchemas';
import InputButton from '@/components/buttons/InputButton';

type Props = {
	userState: UserSchema;
};

export default function ChatForm({ userState }: Props) {
	const {
		createChatPost,
		updateChatPost,
		createChatMutation,
		updateChatMutation,
	} = useChatMutate();
	const [socketState] = useAtom(socketAtom);
	const [chatInputState, setChatInputState] = useAtom(chatInputAtom);
	const [chatEditedState] = useAtom(chatEditedAtom);
	const [isChatEditedState, setIsChatEditedState] = useAtom(isChatEditedAtom);
	const [chatSocketState] = useAtom(chatSocketAtom);
	const [, setIsChatUpdatedState] = useAtom(isChatUpdatedAtom);

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();
		if (!chatInputState) return;

		if (isChatEditedState) {
			if (!chatEditedState) return;
			// 編集中のチャットを取得しtitleを入力内容に置き換えデータベースを更新する
			const { id, published } = chatEditedState;
			const updateChat: UpdateChat = {
				id,
				title: chatInputState,
				published,
			};
			await updateChatPost(updateChat);
			// await updateChatMutation.mutate(updateChat);
		} else {
			const updateChat = {
				title: chatInputState,
				published: true,
				User_id: userState?.id || '',
				Profile_id: userState?.Profile_id || '',
				// TODO: チャットにルームIDを格納し設定する
				Room_id: '00000000-0000-0000-0000-000000000000',
			};
			await createChatPost(updateChat);
			// await createChatMutation.mutate(updateChat);
		}

		setChatInputState('');
		setIsChatEditedState(false);
	};

	useLayoutEffect(() => {
		socketState?.emit('socket:chat', chatSocketState);
		console.log('send client chat:', chatSocketState);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatSocketState]);

	return (
		<section className="">
			<form
				onSubmit={handleSubmit}
				className="grid place-items-center"
			>
				<InputButton
					label={isChatEditedState ? '更新' : '投稿'}
					name="name"
					placeholder="メッセージを入力してください"
					value={chatInputState}
					disabled={!chatInputState}
					isReverse={isChatEditedState}
					onChange={(event) => setChatInputState(event.target.value)}
				/>
			</form>
		</section>
	);
}
