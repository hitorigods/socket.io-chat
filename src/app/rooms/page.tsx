'use client';

import { Suspense } from 'react';

import Heading from '@/components/Heading';
import ChatArea from '@/components/chat/ChatArea';

export default function Rooms() {
	return (
		<Suspense fallback="loading...">
			<Heading title="Rooms" />
			<ChatArea />
		</Suspense>
	);
}
