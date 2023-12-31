import { atom } from 'jotai';
import { Socket } from 'socket.io-client';
import Message from '@/models/message';

// 状態：WebSocketコネクション
export const atomSocket = atom(null as unknown as Socket);
atomSocket.debugLabel = 'atomSocket';

// 状態：メッセージ一覧
export const atomMessageBoard = atom<Array<Message>>([]);
atomMessageBoard.debugLabel = 'atomMessageBoard';

// 状態：ユーザー名
export const atomUserName = atom('');
atomUserName.debugLabel = 'atomUserName';
