import type { Metadata } from 'next';
import { Noto_Sans_JP, Inter } from 'next/font/google';
import '@/assets/font/SFMono/SFMono.css';
import '@fontsource-variable/noto-sans-jp';

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
			<body
				className={`${inter.className} bg-dark bg-[url('/_assets/img/bg.jpg')] bg-cover font-default text-white`}
			>
				<JotaiProvider>
					<div className="min-h-screen">
						<div className="grid h-screen place-content-center place-items-center gap-[40px]">
							{children}
						</div>
					</div>
				</JotaiProvider>
			</body>
		</html>
	);
}
