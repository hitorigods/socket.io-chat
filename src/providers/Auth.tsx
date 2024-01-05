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

	const validateHandler = useCallback(async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		console.log('user', user);

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
		console.log('profile', profile);

		if (!profile) {
			await router.push('/profile');
			router.refresh();
			return;
		}

		setStateUser({
			id: user?.id || '',
			nickname: profile?.nickname || '',
			avatarUrl: profile?.avatarUrl || '',
			Profile_id: profile?.id || '',
		});
		console.log('ok stateUser', stateUser);
	}, []);

	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event, _) => {
			console.log('event', event);
			console.log('onAuth stateUser', stateUser);

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
		validateHandler();
	}, [router, pathname, setStateUser]);

	return <>{props.children}</>;
}
