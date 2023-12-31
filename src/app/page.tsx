'use client';

import { Suspense } from 'react';

import Heading from '@/components/Heading';
import ConnectionForm from '@/components/ConnectForm';

export default function Home() {
	return (
		<Suspense fallback="loading...">
			<Heading title="Top" />
			<ConnectionForm />
		</Suspense>
	);
}
