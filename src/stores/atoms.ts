import { atom } from 'jotai';
import { Socket } from 'socket.io-client';
import Message from '@/models/message';

// 状態：WebSocketコネクション
export const socketAtom = atom(null as unknown as Socket);
socketAtom.debugLabel = 'socketAtom';

// 状態：メッセージ一覧
export const roomMessagesAtom = atom<Array<Message>>([]);
roomMessagesAtom.debugLabel = 'roomMessagesAtom';

// 状態：ユーザー名
export const userNameAtom = atom('');
userNameAtom.debugLabel = 'userNameAtom';
