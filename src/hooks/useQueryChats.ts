import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import supabase from '@/libs/supabase';
import { FetchChat, EditedChat } from '@/schemas/chat';
import { inputChatAtom } from '@/stores/atoms';

export const useQueryChats = () => {
	const getChats = async () => {
		const { data, error } = await supabase
			.from('chat')
			.select('*')
			.order('updatedAt', { ascending: true });
		if (error) {
			throw new Error(error.message);
		}
		return data;
	};
	return useQuery<FetchChat[], Error>({
		queryKey: ['chats'],
		queryFn: getChats,
		staleTime: Infinity,
	});
};

export const useMutateChat = () => {
	const queryClient = useQueryClient();
	const [, setInputChat] = useAtom(inputChatAtom);

	/**
	 * チャットデータを作成する
	 */
	const createMutationChat = useMutation({
		mutationFn: async (
			chat: Omit<FetchChat, 'id' | 'createdAt' | 'updatedAt'>
		) => {
			const { data, error } = await supabase.from('chat').insert(chat).select();
			if (error) throw new Error(error.message);
			return data;
		},
		onSuccess: (result: FetchChat[]) => {
			const previousChats = queryClient.getQueryData<FetchChat[]>(['chats']);
			if (previousChats && result != null) {
				queryClient.setQueryData(['chats'], [...previousChats, result[0]]);
			}
		},
		onError(error: any) {
			console.error(error.message);
		},
	});

	/**
	 * チャットデータを更新する
	 */
	const updateMutationChat = useMutation({
		mutationFn: async (chat: EditedChat) => {
			const { data, error } = await supabase
				.from('chats')
				.update({ title: chat.title })
				.eq('id', chat.id)
				.select();
			if (error) throw new Error(error.message);
			console.log(data);
			return data;
		},
		onSuccess: (result: FetchChat[], variables: FetchChat) => {
			const previousTodos = queryClient.getQueryData<FetchChat[]>(['chats']);
			if (previousTodos && result != null) {
				const newChats = previousTodos.map((chat) =>
					chat.id === variables.id ? result[0] : chat
				);
				queryClient.setQueryData(['chats'], newChats);
			}
			setInputChat('');
		},
		onError(error: any) {
			console.error(error.message);
			setInputChat('');
		},
	});

	/**
	 * チャットデータを削除する
	 */
	const deleteMutationChat = useMutation({
		mutationFn: async (id: string) => {
			const { data, error } = await supabase
				.from('chats')
				.delete()
				.eq('id', id);
			if (error) throw new Error(error.message);
			return data;
		},
		onSuccess: (_, variables) => {
			const previousTodos = queryClient.getQueryData<FetchChat[]>(['chats']);
			if (previousTodos) {
				queryClient.setQueryData(
					['chats'],
					previousTodos.filter((chat) => chat.id !== variables)
				);
			}
			setInputChat('');
		},
		onError(error: any) {
			console.error(error.message);
			setInputChat('');
		},
	});

	return {
		createMutationChat,
		updateMutationChat,
		deleteMutationChat,
	};
};
