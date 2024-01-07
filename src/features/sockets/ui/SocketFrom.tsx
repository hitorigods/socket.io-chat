'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import { useAtom } from 'jotai';

import { socketAtom } from '@/features/sockets/socketAtoms';
import { chatItemsAtom, isChatUpdatedAtom } from '@/features/chats/chatAtom';
import { SocketChat, ChatSchema } from '@/features/chats/chatSchemas';
import InputButton from '@/components/buttons/InputButton';

export default function SocketFrom() {
	const router = useRouter();
	const [, setSocketState] = useAtom(socketAtom);
	const [, setChatItemsState] = useAtom(chatItemsAtom);
	const [isChatUpdatedState, setIsChatUpdatedState] =
		useAtom(isChatUpdatedAtom);
	const [roomName, setRoomName] = useState('');

	const initializer = async (socket: any) => {
		socket.on('connect', () => {
			console.log('Connected to the server');
		});

		socket.on('disconnect', () => {
			console.log('Disconnected from the server');
		});

		socket.on('socket:chat', (payload: SocketChat) => {
			console.log('received client chat:', payload);

			const { type, data } = payload;
			switch (type) {
				case 'create':
					setChatItemsState((state) => {
						// 念のため重複を削除
						const newItems = Array.from(
							new Map(state.map((item) => [item.id, item])).values()
						);
						// 既に存在する場合は追加しない
						return newItems.map((item) => item.id).find((id) => id === data.id)
							? newItems
							: [data as ChatSchema, ...newItems];
					});
					break;
				case 'update':
					setChatItemsState((state) =>
						state.map((item) => {
							if (item.id === data.id) {
								return { ...item, ...data };
							}
							return item;
						})
					);
					setIsChatUpdatedState(true);
					break;
				case 'delete':
					setChatItemsState((state) =>
						state.filter((item) => item.id !== data.id)
					);
					break;
				default:
					break;
			}
		});
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		console.log('handleSubmit');
		event.preventDefault();
		const handleSocket = await fetch(
			`${process.env.NEXT_PUBLIC_SITE_URL}/api/sockets`,
			{ method: 'POST' }
		);

		const socket = io({ autoConnect: false });
		console.log('socket', socket);

		socket.connect();

		initializer(socket);
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
				placeholder="表示名を入力してください"
				value={roomName}
				disabled={!roomName}
				onChange={handleChange}
			/>
		</form>
	);
}
