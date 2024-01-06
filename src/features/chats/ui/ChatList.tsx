'use client';

import { ChatSchema } from '@/features/chats/chatSchemas';
import ChatItem from '@/features/chats/ui/ChatItem';

type Props = {
	chatItems: ChatSchema[];
	chatsError: Error;
	isChatsLoading: boolean;
	isChatsError: boolean;
};
export default function ChatList({
	chatItems,
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

	return !chatItems ? null : chatItems?.length ? (
		<section>
			<div className="scrollbar h-[calc(100vh-420px)] overflow-y-auto overscroll-y-none px-[40px]">
				<ul className="grid gap-[10px]">
					{chatItems.map((item: ChatSchema) => (
						<ChatItem
							key={item.id}
							data={item}
						/>
					))}
				</ul>
			</div>
		</section>
	) : null;
}
