import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import supabase from '@/utils/libs/supabase';
import { statusAtom } from '@/features/statuses/statusAtom';

export const useAuthOauthSignIn = () => {
	const [statusState, setStatusState] = useAtom(statusAtom);

	useEffect(() => {
		console.log('statusState', statusState);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [statusState]);

	const handleOAuthSignIn = async (
		event: React.MouseEvent<HTMLButtonElement>,
		{ provider }: { provider: 'google' | 'github' | 'discord' }
	) => {
		event.preventDefault();

		const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);

		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: provider,
				options: {
					redirectTo: process.env.NEXT_PUBLIC_SITE_URL,
				},
			});
			if (error) {
				setStatusState((state) => [
					...state,
					{ type: 'error', message: error?.message },
				]);
			}
		} catch (error) {
			if (error instanceof Error) {
				setStatusState((state) => [
					...state,
					// @ts-ignore
					{ type: 'error', message: error.message },
				]);
			} else {
				setStatusState((state) => [
					...state,
					{ type: 'error', message: `${providerName}との連携に失敗しました。` },
				]);
			}
		}
		setStatusState((state) => [
			...state,
			{ type: 'update', message: `${providerName}との連携に成功しました！` },
		]);
	};

	return { handleOAuthSignIn };
};
