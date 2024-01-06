import { atom } from 'jotai';
import { Socket } from 'socket.io-client';
import { UserSchema } from '@/features/users/userSchemas';
import { ChatSchema, SocketChat } from '@/features/chats/chatSchemas';

// WebSocketコネクション
export const atomSocket = atom(null as unknown as Socket);
atomSocket.debugLabel = 'atomSocket';

// ログインユーザー情報
export const atomUser = atom({} as UserSchema);
atomUser.debugLabel = 'atomUser';

// チャットの一覧データ
export const atomChatItems = atom([] as ChatSchema[]);
atomChatItems.debugLabel = 'atomChatItems';

// ソケットに送るチャットデータ
export const atomSocketChat = atom({} as SocketChat | null);
atomSocketChat.debugLabel = 'atomSocketChat';

// チャットの入力内容
export const atomInputChat = atom('');
atomInputChat.debugLabel = 'atomInputChat';

// 編集チャットの内容
export const atomEditedChat = atom({} as ChatSchema | null);
atomEditedChat.debugLabel = 'atomEditedChat';

// チャットが編集中か判定
export const atomIsEditedChat = atom(false);
atomIsEditedChat.debugLabel = 'atomIsEditedChat';
