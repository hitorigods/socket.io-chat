'use client';

import { io } from 'socket.io-client';

import { SchemaChat, SetChats } from '@/schemas/chat';

const initializer = (socket: any, setRoomChats: SetChats) => {
	socket.on('connect', () => {
		console.log('Connected to the server');
	});

	socket.on('disconnect', () => {
		console.log('Disconnected from the server');
	});

	socket.on('chat', (newChat: SchemaChat) => {
		setRoomChats((roomChats: SchemaChat[]) => {
			const newroomChats = Array.from(
				new Map(roomChats.map((chat) => [chat.id, chat])).values()
			);
			newroomChats.push(newChat);
			return newroomChats;
		});
	});
};

export function connectionSocket(
	setRoomChats: SetChats,
	setSocket: (socket: any) => void
) {
	const socket = io({ autoConnect: false });
	socket.connect();
	initializer(socket, setRoomChats);
	setSocket(socket);
}
