import { z } from 'zod';
import { SetStateAction } from 'jotai';

import { SetAtom } from '@/types/atom';

const chatSchema = z.object({
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
	User_id: string;
	Room_id: string;
};

export type EditedChat = {
	id: string;
	title: string;
	published?: boolean;
	User_id?: string;
	Room_id?: string;
};

export type ChatSchema = z.infer<typeof chatSchema>;
export type SetChatSchema = SetAtom<[SetStateAction<ChatSchema[]>], void>;
