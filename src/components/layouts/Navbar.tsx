import React from 'react';

import { useAuthSignOut } from '@/features/auths/useAuthSignOut';
import { usePagesRouter } from '@/features/routers/usePagesRouter';
import NavButton from '@/components/buttons/NavButton';

export default function Navbar() {
	const { handleSignOut } = useAuthSignOut();
	const { handleRouterProfile } = usePagesRouter();

	return (
		<nav className="ml-auto">
			<ul className="flex items-center gap-[theme(spacing.sm)] [&>li]:min-w-[100px]">
				<li className="">
					<NavButton
						label="プロフィール"
						onClick={handleRouterProfile}
					/>
				</li>
				<li>
					<NavButton
						label="サインアウト"
						onClick={handleSignOut}
					/>
				</li>
			</ul>
		</nav>
	);
}
