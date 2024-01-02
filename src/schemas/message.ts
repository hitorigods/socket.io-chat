import { z } from 'zod';
import { SetStateAction } from 'jotai';

import { SetAtom } from '@/types/atom';

const MessageSchemaDef = z.object({
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

export type Message = z.infer<typeof MessageSchemaDef>;
export type SetMessages = SetAtom<[SetStateAction<Message[]>], void>;
