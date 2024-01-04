'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';

import supabase from '@/libs/supabase';
import { atomUser } from '@/stores/atoms';

type Props = {
	children: React.ReactNode;
};

export function AuthProvider(props: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const [stateUser, setStateUser] = useAtom(atomUser);

	const validateSession = useCallback(async () => {
		const { data: settionData, error: settionError } =
			await supabase.auth.getSession();

		if (settionError) {
			console.error(settionError);
		}

		if (!settionData?.session) {
			router.push('/auth');
			return;
		}

		const {
			data: { user },
		} = await supabase.auth.getUser();
		console.log('user', user);

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

		if (!user && pathname !== '/auth') {
			await router.push('/auth');
		}
	}, [router, pathname]);

	supabase.auth.onAuthStateChange((event, _) => {
		if (event === 'SIGNED_IN' && pathname === '/auth') {
			router.push('/');
		}
		if (event === 'SIGNED_OUT') {
			router.push('/auth');
		}
	});

	useEffect(() => {
		validateSession();
	}, [validateSession]);

	return <>{props.children}</>;
}
