import type { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors';
import type { Socket as NetSocket } from 'net';
import type { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';

type ResponseWebSocket = NextApiResponse & {
	socket: NetSocket & { server: HttpServer & { io?: SocketServer } };
};

const corsMiddleware = cors();

export default function SocketResponse(
	req: NextApiRequest,
	res: ResponseWebSocket
) {
	if (req.method !== 'POST') {
		return res.status(405).end();
	}
	if (res.socket.server.io) {
		return res.send('socket.io already exists');
	}

	const roomId = req.query.id || 'default';

	const io = new SocketServer(res.socket.server, {
		// 13.5以降のバージョンでは不要？
		addTrailingSlash: false,
	});

	io.on('connection', (socket) => {
		socket.join(roomId);
		const clientId = socket.id;
		console.log(`client id: ${clientId} connected`);

		socket.on('disconnect', () => {
			console.log(`client id: ${clientId} disconnected`);
		});

		socket.on('socket:chat', (data) => {
			io.to(roomId).emit('socket:chat', data);
			console.log(`Received client id: ${clientId} chat: ${data}`);
		});
	});

	// CORS対策、有効にした上でサーバーを設定
	corsMiddleware(req, res, () => {
		res.socket.server.io = io;
		res.end();
	});
}
