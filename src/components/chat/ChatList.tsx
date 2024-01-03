'use client';

import { FetchChat } from '@/schemas/chat';
import ChatItem from '@/components/chat/ChatItem';
import { useQueryChat } from '@/hooks/useQueryChats';

export default function ChatList() {
	const { getAllChats } = useQueryChat();
	const { isLoading, isError, data: chats, error } = getAllChats;

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	return chats?.length ? (
		<section>
			<ul className="grid gap-[10px]">
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