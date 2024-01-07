import type { Metadata } from 'next';
import { Suspense } from 'react';

import { JotaiProvider } from '@/utils/libs/JotaiProvider';
import { FetchQueryProvider } from '@/utils/libs/FetchQueryProvider';

import { AuthProvider } from '@/features/auths/AuthProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import { Noto_Sans_JP, Goblin_One } from 'next/font/google';
const noto = Noto_Sans_JP({
	weight: ['100', '300', '400', '500', '700', '900'],
	subsets: ['latin'],
	variable: '--font-noto-sans-jp',
});
const goblin = Goblin_One({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-goblin-one',
});
import '@/assets/fonts/SFMono/@font-face.css';
import '@/assets/fonts/Deorme/@font-face.css';

import './globals.css';

import Favicon from '@/assets/favions/favicon.ico';

export const metadata: Metadata = {
	title: process.env.NEXT_PUBLIC_SITE_NAME || '',
	description: '',
	icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja">
			<body
				className={`bg-dark bg-[url('/_assets/img/bg.jpg')] bg-cover font-display text-white selection:bg-primary selection:text-white ${noto.variable} ${goblin.variable}`}
			>
				<FetchQueryProvider>
					<JotaiProvider>
						<AuthProvider>
							<div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
								<Header />
								<main className="grid grid-rows-[auto_1fr] items-start justify-center gap-[theme(spacing.content)] px-[theme(spacing.default)] py-[theme(spacing.content)]">
									{children}
								</main>
								<Footer />
							</div>
						</AuthProvider>
					</JotaiProvider>
				</FetchQueryProvider>
			</body>
		</html>
	);
}
