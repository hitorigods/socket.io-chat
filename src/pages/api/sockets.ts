import type { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors';

import type { Socket as NetSocket } from 'net';
import type { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';

// Next.jsの型定義を拡張してSocket.IOの型定義を追加
type ResponseWebSocket = NextApiResponse & {
	socket: NetSocket & { server: HttpServer & { io?: SocketServer } };
};

const corsMiddleware = cors();

// Next.jsのAPIルーティングの入り口となる関数
export default function SocketHandler(
	req: NextApiRequest,
	res: ResponseWebSocket
) {
	if (req.method !== 'POST') {
		return res.status(405).end();
	}
	if (res.socket.server.io) {
		return res.send('socket.io already exists');
	}
	// Socket.IOのサーバーを作成する
	const io = new SocketServer(res.socket.server, {
		// 13.5以降のバージョンでは不要？
		addTrailingSlash: false,
	});

	// クライアントが接続してきたら、コネクションを確立する
	io.on('connection', (socket) => {
		const clientId = socket.id;
		console.log(`client id: ${clientId} connected`);

		// メッセージを受信したら、全クライアントに送信する
		socket.on('message', (data) => {
			io.emit('message', data);
			console.log(`Received client id: ${clientId} message: ${data}`);
		});

		// クライアントが切断した場合の処理
		socket.on('disconnect', () => {
			console.log(`client id: ${clientId} disconnected`);
		});
	});

	// CORS対策、有効にした上でサーバーを設定する
	corsMiddleware(req, res, () => {
		res.socket.server.io = io;
		res.end();
	});
}