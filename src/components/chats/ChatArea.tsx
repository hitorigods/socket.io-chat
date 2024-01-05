'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { atomUser } from '@/stores/atoms';
import ChatList from '@/components/chats/ChatList';
import ChatForm from '@/components/chats/ChatForm';

export default function ChatArea() {
	const [stateUser] = useAtom(atomUser);

	return (
		<>
			<div className="grid content-between gap-[40px]">
				<ChatList />
				<ChatForm stateUser={stateUser} />
			</div>
		</>
	);
}
