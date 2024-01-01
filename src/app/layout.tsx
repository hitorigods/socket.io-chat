import type { Metadata } from 'next';

import { JotaiProvider } from '@/providers/jotai';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import '@/styles/globals.css';

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
				className={` bg-dark bg-[url('/_assets/img/bg.jpg')] bg-cover font-default text-white selection:bg-primary selection:text-white`}
			>
				<JotaiProvider>
					<div className="grid min-h-screen grid-rows-[50px_1fr_50px]">
						<Header />
						<main className="grid place-content-center place-items-center gap-[40px]">
							{children}
						</main>
						<Footer />
					</div>
				</JotaiProvider>
			</body>
		</html>
	);
}
