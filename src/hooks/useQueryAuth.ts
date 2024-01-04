import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import supabase from '@/libs/supabase';

export const useMutateAuth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const reset = () => {
		setEmail('');
		setPassword('');
	};

	const loginMutaion = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) throw new Error(error.message);
		},
		onError: (error: any) => {
			alert(error.message);
			reset();
		},
	});

	const registerMutaion = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.auth.signUp({
				email,
				password,
			});
			if (error) throw new Error(error.message);
		},
		onSuccess: () => {
			alert('登録完了');
			reset();
		},
		onError: (error: any) => {
			alert(error.message);
			reset();
		},
	});

	return {
		email,
		setEmail,
		password,
		setPassword,
		loginMutaion,
		registerMutaion,
	};
};
