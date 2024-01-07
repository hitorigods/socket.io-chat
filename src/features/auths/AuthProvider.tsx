'use client';

import { useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAtom } from 'jotai';

import supabase from '@/utils/libs/supabase';
import { userAtom } from '@/features/users/userAtom';

type Props = {
	children: React.ReactNode;
};

export function AuthProvider(props: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const [, setUserState] = useAtom(userAtom);

	const sessionValidate = useCallback(async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			await router.push('/auth');
			return;
		}

		const { data: profile, error } = await supabase
			.from('Profiles')
			.select()
			.eq('User_id', user.id)
			.limit(1)
			.single();

		if (!profile) {
			await router.push('/profile');
			return;
		}

		setUserState({
			id: user?.id || '',
			nickname: profile?.nickname || '',
			avatarUrl: profile?.avatarUrl || '',
			Profile_id: profile?.id || '',
		});
	}, []);

	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event, _) => {
			console.log('event', event);
			console.log('pathname', pathname);

			if (event === 'SIGNED_IN' && pathname === '/auth') {
				await router.push('/');
			}
			if (event === 'SIGNED_OUT') {
				await router.push('/auth');
			}
		});
	}, []);

	useEffect(() => {
		sessionValidate();
	}, [router, pathname, setUserState]);

	return <>{props.children}</>;
}
