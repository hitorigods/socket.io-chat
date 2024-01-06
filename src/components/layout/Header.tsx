'use client';

import Image from 'next/image';

import NavButton from '@/components/buttons/NavButton';
import { useAuthSignOut } from '@/features/auths/useAuthSignOut';
import { usePagesRouter } from '@/features/routers/usePagesRouter';

import imgLogo from '@/assets/icons/logo.svg';

export default function Header() {
	const { handleRouterHome, handleRouterProfile } = usePagesRouter();
	const { handleSignOut } = useAuthSignOut();

	return (
		<>
			<header className="sticky top-0 h-[theme(sizeing.header)] bg-dark/50">
				<div className="flex h-full items-center justify-between px-[theme(spacing.default)]">
					<div>
						<button
							className="flex items-center gap-[theme(spacing.sm)]"
							onClick={handleRouterHome}
						>
							<span>
								<Image
									className="aspect-square max-w-full object-contain"
									src={imgLogo}
									alt={process.env.NEXT_PUBLIC_SITE_NAME || ''}
									width={50}
									height={50}
								/>
							</span>
							<span className="font-logo text-2xl">
								{process.env.NEXT_PUBLIC_SITE_NAME || ''}
							</span>
						</button>
					</div>
					<nav>
						<ul className="flex items-center gap-[theme(spacing.sm)] [&>li]:min-w-[100px]">
							<li className="">
								<NavButton
									label="アカウント"
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
				</div>
			</header>
		</>
	);
}
