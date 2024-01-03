import type { Metadata } from 'next';
import { JotaiProvider } from '@/providers/jotai';
import { FetchQueryProvider } from '@/providers/fetchQuey';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import '@/styles/globals.css';

export const metadata: Metadata = {
	title: 'Socket.io Chat App',
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
				<FetchQueryProvider>
					<JotaiProvider>
						<div className="grid min-h-screen grid-rows-[50px_1fr_50px]">
							<Header />
							<main className="grid place-items-center gap-[40px] px-[20px] py-[50px]">
								{children}
							</main>
							<Footer />
						</div>
					</JotaiProvider>
				</FetchQueryProvider>
			</body>
		</html>
	);
}
