import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

//jotaiからProviderコンポーネントをインポート
import { Provider } from 'jotai';

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
			<body className={inter.className}>
				{/* jotaiのAtomを利用するためのProvider */}
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}