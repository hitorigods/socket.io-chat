'use client';

import { io } from 'socket.io-client';

import { Message, SetMessageBoard } from '@/models/message';

const initializer = (socket: any, setMessageBoard: SetMessageBoard) => {
	socket.on('connect', () => {
		console.log('Connected to the server');
	});

	socket.on('disconnect', () => {
		console.log('Disconnected from the server');
	});

	socket.on('message', (newMessage: Message) => {
		setMessageBoard((messageBoard: Message[]) => {
			const newMessageBoard = Array.from(
				new Map(messageBoard.map((message) => [message.id, message])).values()
			);
			newMessageBoard.push(newMessage);
			return newMessageBoard;
		});
	});
};

export function connectionSocket(
	setMessageBoard: SetMessageBoard,
	setSocket: (socket: any) => void
) {
	const socket = io({ autoConnect: false });
	socket.connect();
	initializer(socket, setMessageBoard);
	setSocket(socket);
}
