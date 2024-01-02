'use client';

import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { FetchChat } from '@/schemas/chat';
import ChatItem from '@/components/chat/ChatItem';
import { useQueryChats } from '@/hooks/useQueryChats';
import { chatItemsAtom } from '@/stores/atoms';

export default function ChatList() {
	const { status, data: chats, error } = useQueryChats();

	if (status === 'pending') {
		return <span>Loading...</span>;
	}

	if (status === 'error') {
		return <span>Error: {error.message}</span>;
	}

	return (
		<section>
			{chats.length && (
				<ul className="grid gap-[1px] overflow-hidden rounded shadow-md">
					{chats.map((chat: FetchChat) => (
						<ChatItem
							key={chat.id}
							chat={chat}
						/>
					))}
				</ul>
			)}
		</section>
	);
}
