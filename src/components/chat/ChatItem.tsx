'use client';

import { FetchChat } from '@/schemas/chat';

interface Props {
	chat: FetchChat;
}

export default function ChatItem({ chat }: Props) {
	return (
		<>
			<li className="bg-dark p-4 text-white transition-all duration-300 ease-in-out">
				{chat.user_id}:{chat.title}
			</li>
		</>
	);
}
