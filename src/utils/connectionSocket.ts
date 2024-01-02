'use client';

import { io } from 'socket.io-client';

import { SchemaMessage, SetMessages } from '@/schemas/message';

const initializer = (socket: any, setRoomMessages: SetMessages) => {
	socket.on('connect', () => {
		console.log('Connected to the server');
	});

	socket.on('disconnect', () => {
		console.log('Disconnected from the server');
	});

	socket.on('message', (newMessage: SchemaMessage) => {
		setRoomMessages((roomMessages: SchemaMessage[]) => {
			const newroomMessages = Array.from(
				new Map(roomMessages.map((message) => [message.id, message])).values()
			);
			newroomMessages.push(newMessage);
			return newroomMessages;
		});
	});
};

export function connectionSocket(
	setRoomMessages: SetMessages,
	setSocket: (socket: any) => void
) {
	const socket = io({ autoConnect: false });
	socket.connect();
	initializer(socket, setRoomMessages);
	setSocket(socket);
}
