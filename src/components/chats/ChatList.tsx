'use client';

import { ChatSchema } from '@/schemas/chats';
import ChatItem from '@/components/chats/ChatItem';

type Props = {
	chatsData: ChatSchema[];
	chatsError: Error;
	isChatsLoading: boolean;
	isChatsError: boolean;
};
export default function ChatList({
	chatsData,
	chatsError,
	isChatsLoading,
	isChatsError,
}: Props) {
	if (isChatsLoading) {
		return <div>Loading...</div>;
	}

	if (isChatsError) {
		return <div>Error: {chatsError.message}</div>;
	}

	return !chatsData ? null : chatsData?.length ? (
		<section>
			<div className="scrollbar h-[calc(100vh-420px)] overflow-y-auto overscroll-y-none px-[40px]">
				<ul className="grid gap-[10px]">
					{chatsData.map((chat: ChatSchema) => (
						<ChatItem
							key={chat.id}
							chat={chat}
						/>
					))}
				</ul>
			</div>
		</section>
	) : null;
}
