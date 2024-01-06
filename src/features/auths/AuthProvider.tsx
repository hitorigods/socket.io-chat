'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';

import supabase from '@/libs/supabase';
import { userAtom } from '@/features/users/userAtom';

type Props = {
	children: React.ReactNode;
};

export function AuthProvider(props: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const [, setUserState] = useAtom(userAtom);

	const handleValidate = useCallback(async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			await router.push('/auth');
			router.refresh();
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
			router.refresh();
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
				router.push('/');
				router.refresh();
			}
			if (event === 'SIGNED_OUT') {
				router.push('/auth');
				router.refresh();
			}
		});
	}, []);

	useEffect(() => {
		handleValidate();
	}, [router, pathname, setUserState]);

	return <>{props.children}</>;
}
