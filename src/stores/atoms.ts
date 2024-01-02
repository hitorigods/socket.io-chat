import { atom } from 'jotai';
import { Socket } from 'socket.io-client';
import { SchemaChat } from '@/schemas/chat';

// 状態：WebSocketコネクション
export const socketAtom = atom(null as unknown as Socket);
socketAtom.debugLabel = 'socketAtom';

// 状態：メッセージ一覧
export const roomChatsAtom = atom<Array<SchemaChat>>([]);
roomChatsAtom.debugLabel = 'roomChatsAtom';

// 状態：ユーザー名
export const userNameAtom = atom('');
userNameAtom.debugLabel = 'userNameAtom';
