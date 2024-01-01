'use client';

import { Suspense } from 'react';

import Heading from '@/components/Heading';
import MessageArea from '@/components/messages/MessageArea';

export default function Rooms() {
	return (
		<Suspense fallback="loading...">
			<Heading title="Rooms" />
			<MessageArea />
		</Suspense>
	);
}
