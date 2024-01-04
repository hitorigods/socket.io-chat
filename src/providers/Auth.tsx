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
	}, [router, pathname]);

	supabase.auth.onAuthStateChange(async (event, _) => {
		console.log('event', event);
		if (event === 'SIGNED_IN' && pathname === '/auth') {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			console.log('session', session);

			const user = session?.user;

			// TODO: ProfilesからユーザーIDに該当するデータを取得
			const userProfileData = {
				id: 'test_id',
				nickname: 'Test User',
				avatarUrl: '',
			};

			setStateUser({
				id: user?.id || '',
				nickname: userProfileData.nickname || '',
				avatarUrl: userProfileData.avatarUrl || '',
				profile_id: userProfileData.id || '',
			});

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
