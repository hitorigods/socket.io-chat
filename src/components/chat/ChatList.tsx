'use client';

import { useEffect } from 'react';
import { FetchChat } from '@/schemas/chat';
import ChatItem from '@/components/chat/ChatItem';
import { useQueryChats } from '@/hooks/useQueryChats';

export default function ChatList() {
	const { isLoading, isError, data: chats, error } = useQueryChats();

	useEffect(() => {
		console.log('useEffect chats:', chats);
	}, [chats]);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	return chats?.length ? (
		<section>
			<ul className="grid gap-[1px] overflow-hidden rounded shadow-md">
				{chats.map((chat: FetchChat) => (
					<ChatItem
						key={chat.id}
						chat={chat}
					/>
				))}
			</ul>
		</section>
	) : null;
}
