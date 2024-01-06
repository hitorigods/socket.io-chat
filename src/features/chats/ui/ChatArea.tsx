'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { atomSocket, atomUser, atomChatItems } from '@/stores/atoms';
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
	const [stateSocket] = useAtom(atomSocket);
	const [stateUser] = useAtom(atomUser);
	const [stateChatItems] = useAtom(atomChatItems);
	const { getQueryChats } = useChatQuery();
	const {
		data: queryChats,
		error: chatsError,
		refetch: chatsRefetch,
		isLoading: isChatsLoading,
		isError: isChatsError,
	}: QueryProps = getQueryChats as unknown as QueryProps;
	const router = useRouter();

	useEffect(() => {
		if (!stateSocket) {
			router.push('/');
			router.refresh();
			return;
		}
	}, []);

	return (
		<>
			<div className="grid content-between gap-[40px]">
				<ChatList
					chatItems={stateChatItems}
					chatsError={chatsError}
					isChatsLoading={isChatsLoading}
					isChatsError={isChatsError}
				/>
				<ChatForm stateUser={stateUser} />
			</div>
		</>
	);
}
