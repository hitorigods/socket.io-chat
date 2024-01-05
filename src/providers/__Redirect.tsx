'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAtom } from 'jotai';

import { atomUser } from '@/stores/atoms';

type Props = {
	children: React.ReactNode;
};

export default function RedirectProvider(props: Props) {
	const [stateUser] = useAtom(atomUser);
	const router = useRouter();
	const pathname = usePathname();

	// useEffect(() => {
	// 	console.log('stateUser', stateUser);

	// 	(async () => {
	// 		if (!stateUser.id && pathname !== '/auth') {
	// 			await router.push('/auth');
	// 			router.refresh();
	// 			return;
	// 		}

	// 		if (!stateUser.Profile_id && pathname !== '/profile') {
	// 			await router.push('/profile');
	// 			router.refresh();
	// 			return;
	// 		}
	// 	})();
	// }, [stateUser]);

	return <>{props.children}</>;
}
