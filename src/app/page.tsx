import Link from 'next/link';
import { Suspense } from 'react';

import Heading from '@/components/Heading';
import ConnectForm from '@/components/ConnectForm';
import AuthSignOut from '@/components/auths/AuthSignOut';

export default function Home() {
	return (
		<Suspense fallback="loading...">
			<div className="grid gap-[50px]">
				<Heading title="Top" />
				<ConnectForm />
				<Link href="/auth">ログイン画面へリンク</Link>
				<AuthSignOut />
			</div>
		</Suspense>
	);
}
