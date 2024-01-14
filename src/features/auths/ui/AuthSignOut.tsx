'use client';

import { useAuthSignOut } from '@/features/auths/useAuthSignOut';
import TextButton from '@/components/buttons/TextButton';

export default function AuthSignOut() {
	const { handleSignOut } = useAuthSignOut();

	return (
		<TextButton
			label="サインアウト"
			onClick={handleSignOut}
		/>
	);
}
