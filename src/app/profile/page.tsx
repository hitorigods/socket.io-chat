import type { Metadata } from 'next';

import Heading from '@/components/Heading';
import ProfileFrom from '@/components/profiles/ProfileForm';

export const metadata: Metadata = {
	title: `プロフィール | ${process.env.NEXT_PUBLIC_SITE_NAME || ''}`,
};

export default function Profile() {
	return (
		<>
			<div className="">
				<Heading title="プロフィール" />
				<ProfileFrom />
			</div>
		</>
	);
}
