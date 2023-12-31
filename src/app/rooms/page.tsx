'use client';
import { Suspense } from 'react';
import MessageList from '@/components/MessageList';

// メッセージの入力と一覧を行うページコンポーネント
export default function Rooms() {
	return (
		<Suspense fallback="loading...">
			<MessageList />
		</Suspense>
	);
}
