'use client';

import {
	createRef,
	useRef,
	useEffect,
	useCallback,
	useLayoutEffect,
} from 'react';
import { useAtom } from 'jotai';

import { ChatSchema } from '@/features/chats/chatSchemas';
import { chatItemsAtom, isChatUpdatedAtom } from '@/features/chats/chatAtom';
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
	const scrollRef = useRef<HTMLElement>(null);
	const [, setChatItemsState] = useAtom(chatItemsAtom);
	const [isChatUpdatedState, setIsChatUpdatedState] =
		useAtom(isChatUpdatedAtom);

	const scrollToBottom = useCallback(() => {
		console.log('isChatUpdatedState', isChatUpdatedState);
		if (!isChatUpdatedState) return;
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: 'smooth',
		});
		setIsChatUpdatedState(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scrollRef]);

	useEffect(() => {
		console.log('useEffect', useEffect);

		scrollToBottom();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isChatUpdatedState]);

	if (isChatsLoading) {
		return <div>Loading...</div>;
	}

	if (isChatsError) {
		return <div>Error: {chatsError.message}</div>;
	}

	return !chatItems ? null : chatItems?.length ? (
		<section
			className="scrollbar h-[calc(theme(height.screen)_-480px)] overflow-y-auto overscroll-y-none px-[40px]"
			ref={scrollRef}
		>
			<ul className="grid gap-[10px]">
				{chatItems.map((item: ChatSchema) => (
					<ChatItem
						key={item.id}
						item={item}
					/>
				))}
			</ul>
		</section>
	) : null;
}
