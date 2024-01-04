'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useCallback, useState } from 'react';
import { useAtom } from 'jotai';

import supabase from '@/libs/supabase';
import { atomUser } from '@/stores/atoms';

type Props = {
	children: React.ReactNode;
};

export function AuthProvider(props: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const [, setStateUser] = useAtom(atomUser);

	const validateSession = useCallback(async () => {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session && pathname !== '/auth') {
			await router.push('/auth');
			router.refresh();
			return;
		}

		const userID = session?.user?.id;
		if (!userID) return;

		let profileData;
		try {
			const { data, error } = await supabase
				.from('Profiles')
				.select()
				.eq('User_id', userID)
				.limit(1)
				.single();
			profileData = data;
		} catch (error) {}

		if (!profileData && pathname !== '/profile') {
			await router.push('/profile');
			router.refresh();
			return;
		}

		setStateUser({
			id: userID || '',
			nickname: profileData?.nickname || '',
			avatarUrl: profileData?.avatarUrl || '',
			Profile_id: profileData?.id || '',
		});
	}, [router, pathname, setStateUser]);

	supabase.auth.onAuthStateChange(async (event, _) => {
		if (event === 'SIGNED_IN' && pathname === '/auth') {
			router.push('/');
			router.refresh();
		}
		if (event === 'SIGNED_OUT') {
			router.push('/auth');
			router.refresh();
		}
	});

	useEffect(() => {
		validateSession();
	}, [validateSession]);

	return <>{props.children}</>;
}
