'use client';

import { MouseEventHandler } from 'react';
import { useAtom } from 'jotai';

import supabase from '@/libs/supabase';
import { atomUser } from '@/stores/atoms';

export function useAuthSignOut() {
	const [, setStateUser] = useAtom(atomUser);

	const handleSignOut: MouseEventHandler<HTMLButtonElement> = async (event) => {
		event.preventDefault();
		await supabase.auth.signOut();
		setStateUser({
			id: '',
			nickname: '',
			avatarUrl: '',
			Profile_id: '',
		});
	};
	return { handleSignOut };
}
