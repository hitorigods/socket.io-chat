import { atom } from 'jotai';
import { RoomSchema } from '@/features/rooms/roomSchemas';

// ルームの一覧データ
export const roomItemsAtom = atom([] as RoomSchema[]);
roomItemsAtom.debugLabel = 'roomItemsAtom';

// ルームの入力内容
export const roomInputAtom = atom('');
roomInputAtom.debugLabel = 'roomInputAtom';

// ルームの編集内容
export const roomEditedAtom = atom({} as RoomSchema | null);
roomEditedAtom.debugLabel = 'roomEditedAtom';

// ルームが編集中か判定
export const isRoomEditedAtom = atom(false);
isRoomEditedAtom.debugLabel = 'isRoomEditedAtom';
