'use client';

import { ChangeEventHandler, FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { io } from 'socket.io-client';
import Message from '@/models/message';
import { messageBoardAtom, socketAtom, userNameAtom } from '@/store/atoms';

// ユーザー名の入力とサーバーへの接続を行うコンポーネント
export default function ConnectionForm() {
	const [userName, setUserName] = useAtom(userNameAtom);
	const [, setMessageBoard] = useAtom(messageBoardAtom);
	const [, setSocket] = useAtom(socketAtom);
	const router = useRouter();

	// フォームの送信
	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		// WebSocketサーバーに接続するにはまずHTTPサーバーに接続してWebSocketのエンドポイントを取得する必要がある
		await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/sockets', {
			method: 'POST',
		});
		// WebSocketサーバーに接続
		const socket = io({ autoConnect: false });
		socket.connect();
		// WebSocketの各イベントに対する処理を定義
		socketInitializer(socket);
		// グローバル状態にソケットを保存
		setSocket(socket);
		// メッセージ一覧ページに遷移
		router.push('/rooms');
	};
	const socketInitializer = (socket: any) => {
		// サーバーとの接続が確立したときの処理
		socket.on('connect', () => {
			console.log('Connected to the server');
		});
		// サーバーとの接続が切断されたときの処理
		socket.on('disconnect', () => {
			console.log('Disconnected from the server');
		});
		// サーバーからメッセージを受信したときの処理
		socket.on('message', (newMessage: Message) => {
			// グローバル状態のメッセージ一覧を更新
			setMessageBoard((messageBoard) => {
				// idが重複するメッセージを削除（一応の処理）
				const newMessageBoard = Array.from(
					new Map(messageBoard.map((message) => [message.id, message])).values()
				);
				// 新しいメッセージを追加
				newMessageBoard.push(newMessage);
				return newMessageBoard;
			});
		});
	};
	// ユーザー名の入力
	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		event.preventDefault();
		setUserName(event.target.value);
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					className="border border-gray-400 p-2"
					name="name"
					placeholder="enter your name"
					value={userName}
					onChange={handleChange}
					autoComplete={'off'}
				/>
				<button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
					Connect
				</button>
			</form>
		</>
	);
}
