import type { Metadata } from 'next';

import Heading from '@/components/layout/Heading';
import ProfileArea from '@/features/profiles/ui/ProfileForm';

export const metadata: Metadata = {
	title: `プロフィール | ${process.env.NEXT_PUBLIC_SITE_NAME || ''}`,
};

export default function Profile() {
	return (
		<>
			<Heading
				label="Profile"
				caption="プロフィール"
			/>
			<ProfileArea />
		</>
	);
}
