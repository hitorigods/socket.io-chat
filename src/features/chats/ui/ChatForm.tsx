'use client';

import React, { useEffect } from 'react';
import { useAtom } from 'jotai';

import {
	chatInputAtom,
	chatEditedAtom,
	isChatEditedAtom,
	chatSocketAtom,
} from '@/features/chats/chatAtom';
import { socketAtom } from '@/features/sockets/socketAtoms';
import { useChatMutate } from '@/features/chats/useChatMutate';
import { UpdateChat } from '@/features/chats/chatSchemas';
import { UserSchema } from '@/features/users/userSchemas';
import FormArea from '@/components/forms/FormArea';
import InputButton from '@/components/buttons/InputButton';

type Props = {
	userState: UserSchema;
	roomId: string;
};

export default function ChatForm({ userState, roomId }: Props) {
	const { createChatPost, updateChatPost } = useChatMutate();
	const [socketState] = useAtom(socketAtom);
	const [chatInputState, setChatInputState] = useAtom(chatInputAtom);
	const [chatEditedState] = useAtom(chatEditedAtom);
	const [isChatEditedState, setIsChatEditedState] = useAtom(isChatEditedAtom);
	const [chatSocketState] = useAtom(chatSocketAtom);

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();
		if (!chatInputState) return;

		if (isChatEditedState) {
			if (!chatEditedState) return;
			const { id, published } = chatEditedState;
			const newData: UpdateChat = {
				id,
				title: chatInputState,
				// TODO: 非公開設定を追加する
				published,
			};
			await updateChatPost(newData);
		} else {
			const newData = {
				title: chatInputState,
				// TODO: 非公開設定を追加する
				published: true,
				User_id: userState?.id || '',
				Profile_id: userState?.Profile_id || '',
				// チャットにルームIDを格納し設定する
				Room_id: roomId || '',
			};
			await createChatPost(newData);
		}

		setChatInputState('');
		setIsChatEditedState(false);
	};

	useEffect(() => {
		if (!chatSocketState) return;
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
