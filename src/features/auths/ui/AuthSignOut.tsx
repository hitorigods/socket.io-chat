'use client';

import { useAuthSignOut } from '@/features/auths/useAuthSignOut';

export default function AuthSignOut() {
	const { handleSignOut } = useAuthSignOut();

	return (
		<>
			<button onClick={handleSignOut}>サインアウト</button>
		</>
	);
}
