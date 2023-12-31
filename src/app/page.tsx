'use client';

import { Suspense } from 'react';

import ConnectionForm from '@/components/ConnectForm';

export default function Home() {
	return (
		<Suspense fallback="loading...">
			<div className="">
				<div className="text-7xl">TOP</div>
			</div>
			<ConnectionForm />
		</Suspense>
	);
}
