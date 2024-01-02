'use client';

import { FetchMessage } from '@/schemas/message';

interface Props {
	message: FetchMessage;
}

export default function MessageItem({ message }: Props) {
	return (
		<>
			<li className="bg-dark p-4 text-white transition-all duration-300 ease-in-out">
				{message.user_id}:{message.title}
			</li>
		</>
	);
}
