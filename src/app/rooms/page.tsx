import type { Metadata } from 'next';

import ChatArea from '@/features/chats/ui/ChatArea';
import Heading from '@/components/layout/Heading';

export const metadata: Metadata = {
	title: `チャットルーム | ${process.env.NEXT_PUBLIC_SITE_NAME || ''}`,
};

export default function Rooms() {
	return (
		<>
			<Heading
				label="Room"
				caption="チャットルーム"
			/>
			<ChatArea />
		</>
	);
}
