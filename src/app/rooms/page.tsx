'use client';

import { Suspense } from 'react';

import Heading from '@/components/Heading';
import MessageList from '@/components/MessageList';

export default function Rooms() {
	return (
		<Suspense fallback="loading...">
			<Heading title="Rooms" />
			<MessageList />
		</Suspense>
	);
}
