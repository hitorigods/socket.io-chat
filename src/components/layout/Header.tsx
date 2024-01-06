'use client';

import Image from 'next/image';
import { useAtom } from 'jotai';

import { atomUser } from '@/stores/atoms';
import { usePagesRouter } from '@/features/routers/usePagesRouter';

import imgLogo from '@/assets/icons/logo.svg';
import Navbar from './Navbar';

export default function Header() {
	const [stateUser] = useAtom(atomUser);
	const { handleRouterHome } = usePagesRouter();

	return (
		<>
			<header className="sticky top-0 h-[theme(sizeing.header)] bg-dark/50">
				<div className="flex h-full items-center justify-between px-[theme(spacing.default)]">
					<div className="mr-auto">
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
					{stateUser && <Navbar />}
				</div>
			</header>
		</>
	);
}
