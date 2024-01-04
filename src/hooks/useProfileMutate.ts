import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import supabase from '@/libs/supabase';
import { ProfileSchema, RowProfile, InsertProfile } from '@/schemas/profiles';

export const useProfileMutate = () => {
	const queryClient = useQueryClient();
	const [profileNickname, setProfileNickname] = useState('');
	const [profileAvatarUrl, setProfileAvatarUrl] = useState('');

	const reset = () => {
		setProfileNickname('');
		setProfileAvatarUrl('');
	};

	const createProfileMutaion = useMutation({
		mutationFn: async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			if (!session) throw new Error('ログインしてください');

			console.log("profileNickname", profileNickname);

			const row = {
				nickname: profileNickname,
				avatarUrl: profileAvatarUrl,
				User_id: session.user.id,
			};

			const { data, error } = await supabase
				.from('Profiles')
				.insert(row)
				.select();
			if (error) throw new Error(error.message);
			return data;
		},
		onSuccess: (result: RowProfile[]) => {
			const previousRows = queryClient.getQueryData<RowProfile[]>([
				'query:profiles',
			]);
			if (previousRows && result != null) {
				queryClient.setQueryData(
					['query:profiles'],
					[...previousRows, result[0]]
				);
			}
			alert('プロフィールを作成しました');
			reset();
		},
		onError: (error: any) => {
			alert(error.message);
			reset();
		},
	});

	const updateProfileMutaion = useMutation({
		mutationFn: async (row: ProfileSchema) => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			if (!session) throw new Error('ログインしてください');

			const newRow = { ...row, User_id: session.user.id };

			const { data, error } = await supabase
				.from('Profiles')
				.update({ nickname: row.nickname, avatarUrl: row.avatarUrl })
				.eq('id', row.id)
				.select();
			if (error) throw new Error(error.message);
			return data;
		},
		onSuccess: (result: RowProfile[], variables: RowProfile) => {
			const previousRows = queryClient.getQueryData<RowProfile[]>([
				'query:profiles',
			]);
			if (previousRows && result != null) {
				const newChats = previousRows.map((row) =>
					row.id === variables.id ? result[0] : row
				);
				queryClient.setQueryData(['query:profiles'], newChats);
			}
			alert('プロフィールを更新しました');
			reset();
		},
		onError: (error: any) => {
			alert(error.message);
			reset();
		},
	});

	const deleteProfileMutaion = useMutation({
		mutationFn: async (id: string) => {
			const { data, error } = await supabase
				.from('Profiles')
				.delete()
				.eq('id', id);
			if (error) throw new Error(error.message);
			return data;
		},
		onSuccess: (_, variables) => {
			const previousRows = queryClient.getQueryData<RowProfile[]>([
				'query:profiles',
			]);
			if (previousRows) {
				queryClient.setQueryData(
					['query:profiles'],
					previousRows.filter((row) => row.id !== variables)
				);
			}
			alert('プロフィールを削除しました');
			reset();
		},
		onError: (error: any) => {
			alert(error.message);
			reset();
		},
	});

	return {
		profileNickname,
		setProfileNickname,
		profileAvatarUrl,
		setProfileAvatarUrl,
		createProfileMutaion,
		updateProfileMutaion,
		deleteProfileMutaion,
	};
};
