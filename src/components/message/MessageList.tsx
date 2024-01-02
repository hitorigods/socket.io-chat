'use client';

import { Message } from '@/schemas/message';
import MessageItem from '@/components/message/MessageItem';

interface Props {
	roomMessages: Message[];
}

export default function MessageList({ roomMessages }: Props) {
	return (
		<>
			<section>
				<ul className="grid gap-[1px] overflow-hidden rounded shadow-md">
					{roomMessages.map((message: Message) => (
						<MessageItem
							key={message.id}
							message={message}
						/>
					))}
				</ul>
			</section>
		</>
	);
}
