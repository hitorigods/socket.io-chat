import { Suspense, useEffect } from 'react';

import Heading from '@/components/Heading';
import ConnectForm from '@/components/ConnectForm';

export default function Home() {
	return (
		<Suspense fallback="loading...">
			<div className="grid gap-[50px]">
				<Heading title="Top" />
				<ConnectForm />
			</div>
		</Suspense>
	);
}
