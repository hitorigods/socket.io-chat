'use client';
import { Suspense } from 'react';
import ConnectionForm from '@/app/components/ConnectForm';

export default function Home() {
	return (
		<>
			<Suspense fallback="loading...">
				<ConnectionForm />
			</Suspense>
		</>
	);
}