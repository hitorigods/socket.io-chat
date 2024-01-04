import { z } from 'zod';

import { Database } from '@/libs/supabase.types';

export const profileSchema = z.object({
	id: z.string().uuid(),
	avatarUrl: z.string().url().nullable(),
	nickname: z.string().max(20),
	User_id: z.string().uuid(),
});

export type DatabaseProfiles = Database['public']['Tables']['Profiles'];
export type RowProfile = DatabaseProfiles['Row'];
export type InsertProfile = Omit<
	DatabaseProfiles['Insert'],
	'id' | 'createdAt' | 'updatedAt'
>;
export type UpdateProfile = Omit<
	DatabaseProfiles['Insert'],
	'createdAt' | 'updatedAt'
>;

export type ProfileSchema = z.infer<typeof profileSchema>;
