import { z } from 'zod';
import { SetStateAction } from 'jotai';

import { SetAtom } from '@/types/atom';

const schemaMessage = z.object({
	id: z.string(),
	room: z.number(),
	author: z.string(),
	body: z.string(),
});

export type FetchMessage = {
	id: string;
	createdAt: string;
	updatedAt: string;
	title: string;
	published?: boolean;
	user_id?: string;
};

export type SchemaMessage = z.infer<typeof schemaMessage>;
export type SetMessages = SetAtom<[SetStateAction<SchemaMessage[]>], void>;
