import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import supabase from '@/libs/supabase';
import { useProfileMutate } from '@/hooks/useProfileMutate';

export const useAuthMutate = () => {
	const [authEmail, setAuthEmail] = useState('');
	const [authPassword, setAuthPassword] = useState('');

	const { createProfileMutaion } = useProfileMutate();

	const reset = () => {
		setAuthEmail('');
		setAuthPassword('');
	};

	const loginAuthMutaion = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.auth.signInWithPassword({
				email: authEmail,
				password: authPassword,
			});
			if (error) throw new Error(error.message);
		},
		onSuccess: () => {
			alert('ログインしました');
			reset();
		},
		onError: (error: any) => {
			alert(error.message);
			reset();
		},
	});

	const registerAuthMutaion = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.auth.signUp({
				email: authEmail,
				password: authPassword,
			});
			if (error) throw new Error(error.message);
		},
		onSuccess: () => {
			createProfileMutaion.mutate();

			alert('登録完了しました');
			reset();
		},
		onError: (error: any) => {
			alert(error.message);
			reset();
		},
	});

	return {
		authEmail,
		setAuthEmail,
		authPassword,
		setAuthPassword,
		loginAuthMutaion,
		registerAuthMutaion,
	};
};