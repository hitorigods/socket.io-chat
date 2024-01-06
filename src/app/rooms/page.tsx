import { Suspense } from 'react';

import ChatArea from '@/features/chats/ui/ChatArea';
import Heading from '@/components/layout/Heading';

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
