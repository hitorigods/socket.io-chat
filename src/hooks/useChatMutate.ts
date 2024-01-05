import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import supabase from '@/libs/supabase';
import { InsertChat, UpdateChat } from '@/schemas/chats';
import { atomEditedChat } from '@/stores/atoms';

export const useChatMutate = () => {
	const queryClient = useQueryClient();
	const [, setEditedChat] = useAtom(atomEditedChat);

	const reset = () => {
		setEditedChat(null);
	};

	/**
	 * チャットデータを作成する
	 */
	const createChatMutation = useMutation({
		mutationFn: async (row: InsertChat) => {
			const { data, error } = await supabase.from('Chats').insert(row).select();
			if (error) throw new Error(error.message);
			return data;
		},
		onSuccess: (result: InsertChat[]) => {
			const previousRows = queryClient.getQueryData<InsertChat[]>([
				'query:chats',
			]);
			if (previousRows && result != null) {
				queryClient.setQueryData(['query:chats'], [...previousRows, result[0]]);
			}
			alert('チャットを投稿しました');
			reset();
		},
		onError(error: any) {
			alert(error.message);
			reset();
		},
	});

	/**
	 * チャットデータを更新する
	 */
	const updateChatMutation = useMutation({
		mutationFn: async (row: UpdateChat) => {
			const { data, error } = await supabase
				.from('Chats')
				.update({ title: row.title })
				.eq('id', row.id || '')
				.select();
			if (error) throw new Error(error.message);
			queryClient.invalidateQueries({ queryKey: ['query:chats'] });
			return data;
		},
		onSuccess: (result: UpdateChat[], variables: UpdateChat) => {
			const previousRows = queryClient.getQueryData<UpdateChat[]>([
				'query:chats',
			]);
			if (previousRows && result != null) {
				const newRows = previousRows.map((row) =>
					row.id === variables.id ? result[0] : row
				);
				queryClient.setQueryData(['query:chats'], newRows);
			}
			alert('チャットを更新しました');
			reset();
		},
		onError(error: any) {
			alert(error.message);
			reset();
		},
	});

	/**
	 * チャットデータを削除する
	 */
	const deleteChatMutation = useMutation({
		mutationFn: async (id: string) => {
			const { data, error } = await supabase
				.from('Chats')
				.delete()
				.eq('id', id);
			if (error) throw new Error(error.message);
			return data;
		},
		onSuccess: (_, variables) => {
			const previousTodos = queryClient.getQueryData<UpdateChat[]>([
				'query:chats',
			]);
			if (previousTodos) {
				queryClient.setQueryData(
					['query:chats'],
					previousTodos.filter((row) => row.id !== variables)
				);
			}
			alert('チャットを削除しました');
			reset();
		},
		onError(error: any) {
			alert(error.message);
			reset();
		},
	});

	return {
		createChatMutation,
		updateChatMutation,
		deleteChatMutation,
	};
};
