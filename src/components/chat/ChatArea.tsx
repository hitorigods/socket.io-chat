'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { atomUserName } from '@/stores/atoms';

import ChatList from '@/components/chat/ChatList';
import ChatForm from '@/components/chat/ChatForm';

export default function ChatArea() {
	const [stateUserName] = useAtom(atomUserName);

	const router = useRouter();

	useEffect(() => {
		if (!stateUserName) router.push('/');
	}, [router, stateUserName]);

	return (
		<>
			<div className="grid content-between gap-[40px]">
				<ChatList />
				<ChatForm stateUserName={stateUserName} />
			</div>
		</>
	);
}
