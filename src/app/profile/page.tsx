import type { Metadata } from 'next';

import PageTitle from '@/components/layouts/PageTitle';
import ProfileArea from '@/features/profiles/ui/ProfileArea';

export const metadata: Metadata = {
	title: `プロフィール | ${process.env.NEXT_PUBLIC_SITE_NAME || ''}`,
};

export default function Profile() {
	return (
		<>
			<PageTitle
				label="Profile"
				caption="プロフィール"
			/>
			<ProfileArea />
		</>
	);
}
