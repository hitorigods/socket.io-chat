import { Suspense } from 'react';
import type { Metadata } from 'next';

import ChatArea from '@/features/chats/ui/ChatArea';
import Heading from '@/components/layout/Heading';

export const metadata: Metadata = {
	title: `チャットルーム | ${process.env.NEXT_PUBLIC_SITE_NAME || ''}`,
};

export default function Rooms() {
	return (
		<Suspense fallback="loading...">
			<div className="grid h-full content-between">
				<Heading
					label="Room"
					caption="チャットルーム"
				/>
				<ChatArea />
			</div>
		</Suspense>
	);
}
