'use client';

import { Suspense } from 'react';

import Heading from '@/components/Heading';
import ConnectForm from '@/components/ConnectForm';

export default function Home() {
	return (
		<Suspense fallback="loading...">
			<Heading title="Top" />
			<ConnectForm />
		</Suspense>
	);
}
