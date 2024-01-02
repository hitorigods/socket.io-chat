'use client';

import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { socketAtom, userNameAtom } from '@/stores/atoms';

export default function Header() {
	const [socket, setSocket] = useAtom(socketAtom);

	const router = useRouter();

	const backHandle = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		socket.disconnect();
		router.push('/');
	};

	return (
		<>
			<header className="sticky top-0 grid place-content-center place-items-center bg-dark/50">
				<p className="text-base uppercase tracking-wider">
					<button onClick={backHandle}>Header</button>
				</p>
			</header>
		</>
	);
}
