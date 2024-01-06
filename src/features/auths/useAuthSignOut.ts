'use client';

import React from 'react';
import { useAtom } from 'jotai';

import supabase from '@/libs/supabase';
import { userAtom } from '@/features/users/userAtom';

export function useAuthSignOut() {
	const [, setUserState] = useAtom(userAtom);

	const handleSignOut: React.MouseEventHandler<HTMLButtonElement> = async (
		event
	) => {
		event.preventDefault();
		await supabase.auth.signOut();
		setUserState(null);
		alert('サインアウトしました');
	};
	return { handleSignOut };
}
