import { atom } from 'jotai';

import { StatusSchema } from '@/features/statuses/statusSchemas';

// ステータス情報
export const statusAtom = atom<StatusSchema>([]);
statusAtom.debugLabel = 'statusAtom';
