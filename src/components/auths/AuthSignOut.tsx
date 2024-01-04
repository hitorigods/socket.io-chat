'use client';

import { MouseEventHandler } from 'react';

import supabase from '@/libs/supabase';

export default function AuthSignOut() {
	const handleSignOut: MouseEventHandler<HTMLButtonElement> = async (event) => {
		event.preventDefault();
		supabase.auth.signOut();
	};

	return (
		<>
			<button onClick={handleSignOut}>ログアウト</button>
		</>
	);
}
