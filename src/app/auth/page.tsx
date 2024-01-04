import type { Metadata } from 'next';

import Heading from '@/components/Heading';
import AuthForm from '@/components/auths/AuthForm';

export const metadata: Metadata = {
	title: `ログイン画面 | ${process.env.NEXT_PUBLIC_SITE_NAME || ''}`,
};

export default function Auth() {
	return (
		<div className="">
			<Heading title="ログイン画面" />
			<AuthForm />
		</div>
	);
}
