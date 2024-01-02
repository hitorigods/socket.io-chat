import { atom } from 'jotai';
import { Socket } from 'socket.io-client';
import { FetchChat } from '@/schemas/chat';

// 状態：WebSocketコネクション
export const socketAtom = atom(null as unknown as Socket);
socketAtom.debugLabel = 'socketAtom';

// 状態：メッセージ一覧
export const chatItemsAtom = atom<FetchChat[]>([]);
chatItemsAtom.debugLabel = 'chatItemsAtom';

// 状態：ユーザー名
export const userNameAtom = atom('');
userNameAtom.debugLabel = 'userNameAtom';

// 状態：チャット内容
export const inputChatAtom = atom('');
inputChatAtom.debugLabel = 'inputChatAtom';
