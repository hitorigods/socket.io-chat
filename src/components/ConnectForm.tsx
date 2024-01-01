'use client';

import { ChangeEventHandler, FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { roomMessagesAtom, socketAtom, userNameAtom } from '@/stores/atoms';
import InputButton from '@/components/InputButton';
import { connectionSocket } from '@/utils/connectionSocket';

export default function ConnectForm() {
	const [userName, setUserName] = useAtom(userNameAtom);
	const [, setRoomMessages] = useAtom(roomMessagesAtom);
	const [, setSocket] = useAtom(socketAtom);
	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		const SocketHandler = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/api/sockets`,
			{ method: 'POST' }
		);
		connectionSocket(setRoomMessages, setSocket);
		router.push('/rooms');
	};

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		event.preventDefault();
		setUserName(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<InputButton
				label="接続"
				name="name"
				placeholder="表示名を入力してください"
				value={userName}
				disabled={!userName}
				onChange={handleChange}
			/>
		</form>
	);
}
