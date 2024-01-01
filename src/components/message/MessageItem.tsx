'use client';

import { Message } from '@/models/message';

interface Props {
	message: Message;
}

export default function MessageItem({ message }: Props) {
	return (
		<>
			<li className="bg-dark p-4 text-white transition-all duration-300 ease-in-out">
				{message.author}:{message.body}
			</li>
		</>
	);
}
