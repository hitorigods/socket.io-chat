import { atom } from 'jotai';
import { ChatSchema, SocketChat } from '@/features/chats/chatSchemas';

// チャットの一覧データ
export const chatItemsAtom = atom([] as ChatSchema[]);
chatItemsAtom.debugLabel = 'chatItemsAtom';

// ソケットに送るチャットデータ
export const chatSocketAtom = atom({} as SocketChat | null);
chatSocketAtom.debugLabel = 'chatSocketAtom';

// チャットの入力内容
export const chatInputAtom = atom('');
chatInputAtom.debugLabel = 'chatInputAtom';

// 編集チャットの内容
export const chatEditedAtom = atom({} as ChatSchema | null);
chatEditedAtom.debugLabel = 'chatEditedAtom';

// チャットが編集中か判定
export const isChatEditedAtom = atom(false);
isChatEditedAtom.debugLabel = 'isChatEditedAtom';

// チャットが更新されたか判定
export const isChatUpdatedAtom = atom(false);
isChatUpdatedAtom.debugLabel = 'isChatUpdatedAtom';
