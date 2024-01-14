'use client';

import { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';

import { ChatSchema } from '@/features/chats/chatSchemas';
import { isChatUpdatedAtom } from '@/features/chats/chatAtom';
import ChatItem from '@/features/chats/ui/ChatItem';

type Props = {
	chatItems: ChatSchema[];
};

export default function ChatList({ chatItems }: Props) {
	const scrollRef = useRef<HTMLElement>(null);
	const [isChatUpdatedState, setIsChatUpdatedState] =
		useAtom(isChatUpdatedAtom);

	const scrollToBottom = () => {
		if (!isChatUpdatedState) return;
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: 'smooth',
		});
		setIsChatUpdatedState(false);
	};

	useEffect(() => {
		scrollToBottom();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isChatUpdatedState]);

	// TODO: Suspenseでエラーをキャッチする
	return !chatItems ? null : chatItems?.length ? (
		<section
			className="scrollbar h-[calc(theme(height.screen)_-600px)] overflow-y-auto overscroll-y-none pl-[theme(spacing.content)] pr-[calc(theme(spacing.content)-.4rem)]"
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
