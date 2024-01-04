'use client';

import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import {
	atomSocket,
	atomUser,
	atomEditedChat,
	atomIsEditedChat,
} from '@/stores/atoms';

export default function Header() {
	const [stateSocket] = useAtom(atomSocket);
	const [, setStateUser] = useAtom(atomUser);
	const [, setStateEditedChat] = useAtom(atomEditedChat);
	const [, setStateIsEditedChat] = useAtom(atomIsEditedChat);

	const router = useRouter();

	const backHandle = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		stateSocket?.disconnect();
		setStateUser({
			id: '',
			nickname: '',
			avatarUrl: '',
			profile_id: '',
		});
		setStateEditedChat(null);
		setStateIsEditedChat(false);
		router.push('/');
	};

	return (
		<>
			<header className="sticky top-0 grid place-content-center place-items-center bg-dark/50">
				<p className="text-base uppercase tracking-wider">
					<button onClick={backHandle}>Socket.io Chat App</button>
				</p>
			</header>
		</>
	);
}
