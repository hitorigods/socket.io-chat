'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { userNameAtom } from '@/stores/atoms';

import MessageList from '@/components/message/MessageList';
import MessageForm from '@/components/message/MessageForm';

export default function MessageArea() {
	const [userName] = useAtom(userNameAtom);

	const router = useRouter();

	useEffect(() => {
		if (!userName) router.push('/');
	}, [router, userName]);

	return (
		<>
			<div className="grid gap-[50px]">
				<MessageList />
				<MessageForm userName={userName} />
			</div>
		</>
	);
}
