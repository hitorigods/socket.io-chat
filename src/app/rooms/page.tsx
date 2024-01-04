import { Suspense } from 'react';

import Heading from '@/components/Heading';
import ChatArea from '@/components/chats/ChatArea';

export default function Rooms() {
	return (
		<Suspense fallback="loading...">
			<div className="grid h-full content-between">
				<Heading title="Rooms" />
				<ChatArea />
			</div>
		</Suspense>
	);
}
