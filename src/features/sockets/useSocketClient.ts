import { useAtom } from 'jotai';
import { io } from 'socket.io-client';

import { chatItemsAtom, isChatUpdatedAtom } from '@/features/chats/chatAtom';
import { SocketChat, ChatSchema } from '@/features/chats/chatSchemas';
import { socketAtom } from './socketAtoms';

type Props = {
	roomId: string;
};

export const useSocketClient = ({ roomId }: Props) => {
	const [, setChatItemsState] = useAtom(chatItemsAtom);
	const [, setIsChatUpdatedState] = useAtom(isChatUpdatedAtom);
	const [, setSocketState] = useAtom(socketAtom);

	const socketInit = async (socket: any) => {
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
							: [...newItems, data as ChatSchema];
					});
					setIsChatUpdatedState((prev) => prev === false);
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

	const socketClientConnect = async () => {
		await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/sockets/${roomId}`, {
			method: 'POST',
		});

		const socket = io({ autoConnect: false });
		console.log('socket', socket);
		socket.emit('join', roomId);
		socket.connect();
		socketInit(socket);
		setSocketState(socket);
	};

	return {
		socketInit,
		socketClientConnect,
	};
};
