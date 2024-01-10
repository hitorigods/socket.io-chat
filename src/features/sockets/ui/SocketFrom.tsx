'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import { useAtom } from 'jotai';

import InputButton from '@/components/buttons/InputButton';
import { socketAtom } from '../socketAtoms';
import { useSocketClient } from '../useSocketClient';

export default function SocketFrom() {
	const router = useRouter();
	const [roomName, setRoomName] = useState('');
	const [, setSocketState] = useAtom(socketAtom);

	const { socketInit } = useSocketClient();

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();
		await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/sockets`, {
			method: 'POST',
		});

		const socket = io({ autoConnect: false });
		console.log('socket', socket);
		socket.connect();
		socketInit(socket);
		setSocketState(socket);

		router.push('/rooms');
	};

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		event.preventDefault();
		setRoomName(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<InputButton
				label="接続"
				name="name"
				placeholder="チャットルーム名を入力してください"
				value={roomName}
				disabled={!roomName}
				onChange={handleChange}
			/>
		</form>
	);
}
