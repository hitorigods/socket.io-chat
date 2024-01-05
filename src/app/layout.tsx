import type { Metadata } from 'next';
import { JotaiProvider } from '@/providers/Jotai';

import { FetchQueryProvider } from '@/providers/FetchQuey';
import { AuthProvider } from '@/providers/Auth';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import '@/styles/globals.css';
import RedirectProvider from '@/providers/__Redirect';

export const metadata: Metadata = {
	title: process.env.NEXT_PUBLIC_SITE_NAME || '',
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
						<AuthProvider>
							{/* <RedirectProvider> */}
							<div className="grid min-h-screen grid-rows-[50px_1fr_50px]">
								<Header />
								<main className="grid place-items-center gap-[40px] px-[20px] py-[50px]">
									{children}
								</main>
								<Footer />
							</div>
							{/* </RedirectProvider> */}
						</AuthProvider>
					</JotaiProvider>
				</FetchQueryProvider>
			</body>
		</html>
	);
}
