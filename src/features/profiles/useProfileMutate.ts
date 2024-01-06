import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import supabase from '@/libs/supabase';
import { RowProfile, InsertProfile } from '@/features/profiles/profileSchemas';

export const useProfileMutate = () => {
	const queryClient = useQueryClient();
	const [profileNickname, setProfileNickname] = useState('');
	const [profileAvatarUrl, setProfileAvatarUrl] = useState('');

	const reset = () => {
		setProfileNickname('');
		setProfileAvatarUrl('');
	};

	const createProfileMutaion = useMutation({
		mutationFn: async (row: InsertProfile) => {
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
		mutationFn: async (row: RowProfile) => {
			const { data, error } = await supabase
				.from('Profiles')
				.update({ nickname: row.nickname, avatarUrl: row.avatarUrl })
				.eq('Profile_id', row.id)
				.select();
			if (error) throw new Error(error.message);
			return data;
		},
		onSuccess: (result: RowProfile[], variables: RowProfile) => {
			const previousRows = queryClient.getQueryData<RowProfile[]>([
				'query:profiles',
			]);
			if (previousRows && result != null) {
				const newRows = previousRows.map((row) =>
					row.id === variables.id ? result[0] : row
				);
				queryClient.setQueryData(['query:profiles'], newRows);
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
