'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { userNameAtom } from '@/stores/atoms';

import ChatList from '@/components/chat/ChatList';
import ChatForm from '@/components/chat/ChatForm';

export default function ChatArea() {
	const [userName] = useAtom(userNameAtom);

	const router = useRouter();

	useEffect(() => {
		if (!userName) router.push('/');
	}, [router, userName]);

	return (
		<>
			<div className="grid content-between gap-[40px]">
				<ChatList />
				<ChatForm userName={userName} />
			</div>
		</>
	);
}
