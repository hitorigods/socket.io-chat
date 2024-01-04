import { atom } from 'jotai';
import { Socket } from 'socket.io-client';
import { UserSchema } from '@/schemas/user';
import { FetchChat } from '@/schemas/chat';

// 状態：WebSocketコネクション
export const atomSocket = atom(null as unknown as Socket);
atomSocket.debugLabel = 'atomSocket';

// 状態：ログインユーザー情報
export const atomUser = atom({} as UserSchema);
atomUser.debugLabel = 'atomUser';

// 状態：チャットの入力内容
export const atomInputChat = atom('');
atomInputChat.debugLabel = 'atomInputChat';

// 状態：編集チャットの内容
export const atomEditedChat = atom({} as FetchChat | FetchChat | null);
atomEditedChat.debugLabel = 'atomEditedChat';

// 状態：チャットが編集中か判定
export const atomIsEditedChat = atom(false);
atomIsEditedChat.debugLabel = 'atomIsEditedChat';
