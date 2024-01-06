import { Suspense } from 'react';

import SocketFrom from '@/features/sockets/ui/SocketFrom';
import AuthSignOut from '@/features/auths/ui/AuthSignOut';
import Heading from '@/components/layout/Heading';

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
