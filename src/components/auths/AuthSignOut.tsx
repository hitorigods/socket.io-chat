'use client';

import { MouseEventHandler } from 'react';
import { useAtom } from 'jotai';

import supabase from '@/libs/supabase';
import { atomUser } from '@/stores/atoms';

export default function AuthSignOut() {
	const [stateUser, setStateUser] = useAtom(atomUser);

	const handleSignOut: MouseEventHandler<HTMLButtonElement> = async (event) => {
		event.preventDefault();
		supabase.auth.signOut();

		setStateUser({
			id: '',
			nickname: '',
			avatarUrl: '',
			Profile_id: '',
		});
	};

	return (
		<>
			<button onClick={handleSignOut}>ログアウト</button>
		</>
	);
}
