import { atom } from 'jotai';
import { Socket } from 'socket.io-client';
import { UserSchema } from '@/schemas/users';
import { ChatSchema } from '@/schemas/chats';

// WebSocketコネクション
export const atomSocket = atom(null as unknown as Socket);
atomSocket.debugLabel = 'atomSocket';

// ログインユーザー情報
export const atomUser = atom({} as UserSchema);
atomUser.debugLabel = 'atomUser';

// チャットの入力内容
export const atomInputChat = atom('');
atomInputChat.debugLabel = 'atomInputChat';

// 編集チャットの内容
export const atomEditedChat = atom({} as ChatSchema | null);
atomEditedChat.debugLabel = 'atomEditedChat';

// チャットが編集中か判定
export const atomIsEditedChat = atom(false);
atomIsEditedChat.debugLabel = 'atomIsEditedChat';
