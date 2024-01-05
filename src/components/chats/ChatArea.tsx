'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { atomUser } from '@/stores/atoms';
import { useChatQuery } from '@/hooks/useChatQuery';
import { ChatSchema } from '@/schemas/chats';
import ChatList from '@/components/chats/ChatList';
import ChatForm from '@/components/chats/ChatForm';

type QueryProps = {
	data: ChatSchema[];
	error: Error;
	refetch: () => void;
	isLoading: boolean;
	isError: boolean;
};

export default function ChatArea() {
	const [stateUser] = useAtom(atomUser);
	const { getQueryChats } = useChatQuery();
	const {
		data: chatsData,
		error: chatsError,
		refetch: chatsRefetch,
		isLoading: isChatsLoading,
		isError: isChatsError,
	}: QueryProps = getQueryChats as unknown as QueryProps;

	return (
		<>
			<div className="grid content-between gap-[40px]">
				<ChatList
					chatsData={chatsData}
					chatsError={chatsError}
					isChatsLoading={isChatsLoading}
					isChatsError={isChatsError}
				/>
				<ChatForm
					stateUser={stateUser}
					chatsRefetch={chatsRefetch}
				/>
			</div>
		</>
	);
}
