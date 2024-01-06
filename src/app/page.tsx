import Link from 'next/link';
import { Suspense } from 'react';

import Heading from '@/components/layout/Heading';
import SocketFrom from '@/features/sockets/SocketFrom';
import AuthSignOut from '@/features/auths/ui/AuthSignOut';

export default function Home() {
	return (
		<Suspense fallback="loading...">
			<div className="grid gap-[50px]">
				<Heading
					label="Top"
					caption="トップ"
				/>
				<SocketFrom />
				<AuthSignOut />
			</div>
		</Suspense>
	);
}
