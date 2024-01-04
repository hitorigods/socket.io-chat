import type { Metadata } from 'next';
import { Suspense, useEffect } from 'react';

import Heading from '@/components/Heading';

export const metadata: Metadata = {
	title: `ログイン画面 | ${process.env.NEXT_PUBLIC_SITE_NAME || ''}`,
};

export default function Auth() {
	return (
		<div className="">
			<Heading title="ログイン画面" />
			<p>Auth</p>
		</div>
	);
}
