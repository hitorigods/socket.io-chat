'use client';

import React, { useEffect } from 'react';
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
import FormArea from '@/components/forms/FormArea';
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
			const newData: UpdateChat = {
				id,
				title: chatInputState,
				// TODO: 非公開設定を追加する
				published,
			};
			await updateChatPost(newData);
			// await updateChatMutation.mutate(newData);
		} else {
			const newData = {
				title: chatInputState,
				// TODO: 非公開設定を追加する
				published: true,
				User_id: userState?.id || '',
				Profile_id: userState?.Profile_id || '',
				// TODO: チャットにルームIDを格納し設定する
				Room_id: '00000000-0000-0000-0000-000000000000',
			};
			await createChatPost(newData);
			// await createChatMutation.mutate(newData);
		}

		setChatInputState('');
		setIsChatEditedState(false);
	};

	useEffect(() => {
		socketState?.emit('socket:chat', chatSocketState);
		console.log('send client chat:', chatSocketState);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatSocketState]);

	return (
		<FormArea
			layoutType={'narrow'}
			onSubmit={handleSubmit}
		>
			<div className="grid px-[50px]">
				<InputButton
					label={isChatEditedState ? '更新' : '投稿'}
					name="name"
					placeholder="メッセージを入力してください"
					value={chatInputState}
					disabled={!chatInputState}
					isReverse={isChatEditedState}
					onChange={(event) => setChatInputState(event.target.value)}
				/>
			</div>
		</FormArea>
	);
}
