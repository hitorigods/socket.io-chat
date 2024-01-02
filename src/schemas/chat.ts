import { z } from 'zod';
import { SetStateAction } from 'jotai';

import { SetAtom } from '@/types/atom';

const schemaChat = z.object({
	id: z.string(),
	room: z.number(),
	author: z.string(),
	body: z.string(),
});

export type FetchChat = {
	id: string;
	createdAt: string;
	updatedAt: string;
	title: string;
	published?: boolean;
	user_id: string;
	room_id: string;
};

export type EditedChat = {
	id: string;
	title: string;
	published?: boolean;
	user_id?: string;
	room_id?: string;
};

export type SchemaChat = z.infer<typeof schemaChat>;
export type SetChats = SetAtom<[SetStateAction<SchemaChat[]>], void>;
