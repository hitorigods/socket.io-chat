'use client';

import { createClient } from '@supabase/supabase-js';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/libs/supabase.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
console.log('supabaseUrl', supabaseUrl);
console.log('supabaseAnonKey', supabaseAnonKey);

// const supabase = createPagesBrowserClient<Database>();
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;

export type UserTable = {
	id: string;
	createdAt: string;
	updatedAt: string;
	email: string;
	password?: string;
	message?: string[];
	Profile?: number;
};

export type ProfileTable = {
	id: string;
	createdAt: string;
	updatedAt: string;
	avaterUrl: string;
	displayName: string;
	user_id: string;
};

export type MessageTable = {
	id: string;
	createdAt: string;
	updatedAt: string;
	title: string;
	published: boolean;
	user_id: string;
	room_id: string;
};

export type RoomTable = {
	id: string;
	createdAt: string;
	updatedAt: string;
	title: string;
	published: boolean;
	message: string[];
};
