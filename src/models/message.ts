import { z } from 'zod';
import { SetStateAction } from 'jotai';

const MessageSchemaDef = z.object({
	id: z.string(),
	room: z.number(),
	author: z.string(),
	body: z.string(),
});

export type SetAtom<Args extends any[], Result> = (...args: Args) => Result;
export type Message = z.infer<typeof MessageSchemaDef>;
export type setRoomMessages = SetAtom<[SetStateAction<Message[]>], void>;
