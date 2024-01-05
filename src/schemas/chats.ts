import { z } from 'zod';
import { SetStateAction } from 'jotai';

import { Database } from '@/libs/supabase.types';
import { SetAtom } from '@/types/atom';

const chatSchema = z.object({
	id: z.string().uuid(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
	title: z.string().max(50),
	published: z.boolean().default(false),
	User_id: z.string().uuid(),
	Profile_id: z.string().uuid(),
	Room_id: z.string().uuid(),
	Profiles: z.object({
		nickname: z.string().max(20),
		avatarUrl: z.string().url().nullable(),
	}),
});

export type ChatSchema = z.infer<typeof chatSchema>;
export type SetChatSchema = SetAtom<[SetStateAction<ChatSchema[]>], void>;

export type DatabaseChats = Database['public']['Tables']['Chats'];
export type RowChat = DatabaseChats['Row'];
export type InsertChat = Omit<
	DatabaseChats['Insert'],
	'id' | 'createdAt' | 'updatedAt'
>;
export type UpdateChat = Omit<
	DatabaseChats['Insert'],
	'createdAt' | 'updatedAt'
>;
