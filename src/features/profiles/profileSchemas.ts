import { Database } from '@/utils/libs/supabase.types';

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
