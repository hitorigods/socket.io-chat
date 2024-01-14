import { z } from 'zod';

import { Database } from '@/utils/libs/supabase.types';

export const rommSchema = z.object({
	id: z.string().uuid(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
	name: z.string().max(50),
	published: z.boolean().default(false),
	Chat_count: z.number().int().default(0),
	User_id: z.string().uuid(),
});

export type RoomSchema = z.infer<typeof rommSchema>;

export type DatabaseRooms = Database['public']['Tables']['Rooms'];
export type RowRoom = DatabaseRooms['Row'];
export type InsertRoom = Omit<
	RowRoom,
	'id' | 'createdAt' | 'updatedAt' | 'Chat_count'
>;
export type UpdateRoom = Omit<RowRoom, 'createdAt' | 'updatedAt' | 'User_id'>;
