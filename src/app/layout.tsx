import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { JotaiProvider } from '@/providers/jotai';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Socket.io Next App',
	description: '',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja">
			<body className={`${inter.className} bg-bg`}>
				<JotaiProvider>
					<div className="min-h-screen">
						<div className="grid h-screen place-content-center place-items-center">
							{children}
						</div>
					</div>
				</JotaiProvider>
			</body>
		</html>
	);
}
