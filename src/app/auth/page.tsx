import type { Metadata } from 'next';
import PageContent from './_content';

export const metadata: Metadata = {
	title: `サインイン | ${process.env.NEXT_PUBLIC_SITE_NAME || ''}`,
};

export default function Auth() {
	return (
		<>
			<PageContent />
		</>
	);
}
