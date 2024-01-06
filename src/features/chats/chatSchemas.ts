import { z } from 'zod';
import { SetStateAction } from 'jotai';

import { Database } from '@/libs/supabase.types';

const chatSchema = z.object({
	id: z.string().uuid(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
	title: z.string().max(50),
	published: z.boolean().default(false),
	User_id: z.string().uuid(),
	// Profile_id: z.string().uuid(),
	// Room_id: z.string().uuid(),
	Profiles: z.object({
		nickname: z.string().max(20),
		avatarUrl: z.string().url().nullable(),
	}),
});

export type ChatSchema = z.infer<typeof chatSchema>;

export type DatabaseChats = Database['public']['Tables']['Chats'];
export type RowChat = DatabaseChats['Row'];
export type InsertChat = Omit<RowChat, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateChat = Omit<
	RowChat,
	'createdAt' | 'updatedAt' | 'User_id' | 'Profile_id' | 'Room_id'
>;

export type SocketChat = {
	type: 'create' | 'update' | 'delete';
	data:
		| ChatSchema
		| Pick<ChatSchema, 'id' | 'title' | 'published' | 'User_id'>
		| Pick<ChatSchema, 'id'>;
};
