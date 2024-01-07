'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { socketAtom } from '@/features/sockets/socketAtoms';
import { userAtom } from '@/features/users/userAtom';
import { chatItemsAtom, isChatUpdatedAtom } from '@/features/chats/chatAtom';

import { useChatQuery } from '@/features/chats/useChatQuery';
import { ChatSchema } from '@/features/chats/chatSchemas';
import ChatList from '@/features/chats/ui/ChatList';
import ChatForm from '@/features/chats/ui/ChatForm';

type QueryProps = {
	data: ChatSchema[];
	error: Error;
	refetch: () => void;
	isLoading: boolean;
	isError: boolean;
};

export default function ChatArea() {
	const router = useRouter();
	const [socketState] = useAtom(socketAtom);
	const [userState] = useAtom(userAtom);
	const [chatItemsState] = useAtom(chatItemsAtom);
	const [isChatUpdatedState, setIsChatUpdatedState] =
		useAtom(isChatUpdatedAtom);
	const { getQueryChats } = useChatQuery();
	const {
		data: queryChats,
		error: chatsError,
		refetch: chatsRefetch,
		isLoading: isChatsLoading,
		isError: isChatsError,
	}: QueryProps = getQueryChats as unknown as QueryProps;

	useEffect(() => {
		if (!socketState) {
			router.push('/');
			return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="grid grid-rows-[1fr_auto] content-between gap-[theme(spacing.content)]">
				<ChatList
					chatItems={chatItemsState}
					chatsError={chatsError}
					isChatsLoading={isChatsLoading}
					isChatsError={isChatsError}
				/>
				<ChatForm userState={userState} />
			</div>
		</>
	);
}
