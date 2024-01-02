'use client';

import { FetchMessage } from '@/schemas/message';
import MessageItem from '@/components/message/MessageItem';
import { useFetchMessages } from '@/hooks/useFetchMessages';

export default function MessageList() {
	const { status, data: messages, error } = useFetchMessages();

	if (status === 'pending') {
		return <span>Loading...</span>;
	}

	if (status === 'error') {
		return <span>Error: {error.message}</span>;
	}

	return (
		<section>
			{messages.length && (
				<ul className="grid gap-[1px] overflow-hidden rounded shadow-md">
					{messages.map((message: FetchMessage) => (
						<MessageItem
							key={message.id}
							message={message}
						/>
					))}
				</ul>
			)}
		</section>
	);
}
