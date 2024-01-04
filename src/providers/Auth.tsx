'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useCallback } from 'react';

import supabase from '@/libs/supabase';

type Props = {
	children: React.ReactNode;
};

export function AuthProvider(props: Props) {
	const router = useRouter();
	const pathname = usePathname();

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
