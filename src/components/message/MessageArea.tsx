'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { roomMessagesAtom, userNameAtom } from '@/stores/atoms';

import MessageList from '@/components/message/MessageList';
import MessageForm from '@/components/message/MessageForm';

export default function MessageArea() {
	const [roomMessages] = useAtom(roomMessagesAtom);
	const [userName] = useAtom(userNameAtom);

	const router = useRouter();

	useEffect(() => {
		if (!userName) router.push('/');
	}, [router, userName]);

	return (
		<>
			<div className="grid gap-[50px]">
				{roomMessages.length > 0 && <MessageList roomMessages={roomMessages} />}
				<MessageForm userName={userName} />
			</div>
		</>
	);
}
