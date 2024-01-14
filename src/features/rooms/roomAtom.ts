import { atom } from 'jotai';
import { RoomSchema } from '@/features/rooms/roomSchemas';

// ルームの一覧データ
export const roomItemsAtom = atom([] as RoomSchema[]);
roomItemsAtom.debugLabel = 'roomItemsAtom';

// ルームの編集内容
export const roomEditedAtom = atom({} as RoomSchema | null);
roomEditedAtom.debugLabel = 'roomEditedAtom';
