'use client';

import { io } from 'socket.io-client';

import { Message, setRoomMessages } from '@/models/message';

const initializer = (socket: any, setRoomMessages: setRoomMessages) => {
	socket.on('connect', () => {
		console.log('Connected to the server');
	});

	socket.on('disconnect', () => {
		console.log('Disconnected from the server');
	});

	socket.on('message', (newMessage: Message) => {
		setRoomMessages((roomMessages: Message[]) => {
			const newroomMessages = Array.from(
				new Map(roomMessages.map((message) => [message.id, message])).values()
			);
			newroomMessages.push(newMessage);
			return newroomMessages;
		});
	});
};

export function connectionSocket(
	setRoomMessages: setRoomMessages,
	setSocket: (socket: any) => void
) {
	const socket = io({ autoConnect: false });
	socket.connect();
	initializer(socket, setRoomMessages);
	setSocket(socket);
}
