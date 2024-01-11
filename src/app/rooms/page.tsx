import { Suspense } from 'react';
import type { Metadata } from 'next';

import ChatArea from '@/features/chats/ui/ChatArea';
import PageTitle from '@/components/layouts/PageTitle';

export const metadata: Metadata = {
	title: `チャットルーム | ${process.env.NEXT_PUBLIC_SITE_NAME || ''}`,
};

export default function Rooms() {
	return (
		<>
			<Suspense fallback="loading...">
				<PageTitle
					label="Room"
					caption="チャットルーム"
				/>
				<ChatArea />
			</Suspense>
		</>
	);
}
