import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import supabase from '@/libs/supabase';
import { Database } from '@/libs/supabase.types';
import { FetchChat } from '@/schemas/chat';

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
		// @ts-expect-error
		queryFn: getChats,
		staleTime: Infinity,
	});
};

export const useMutateChat = () => {
	const queryClient = useQueryClient();

	/**
	 * チャットデータをデータベースに追加する
	 */
	const createMutationChat = useMutation(
		// @ts-expect-error
		async (chat: Omit<FetchChat, 'id' | 'createdAt' | 'updatedAt'>) => {
			const { data, error } = await supabase.from('chat').insert(chat).select();
			if (error) throw new Error(error.message);
			return data;
		},
		{
			onSuccess: (res: FetchChat[]) => {
				const previousChats = queryClient.getQueryData<FetchChat[]>(['chats']);
				if (previousChats && res != null) {
					queryClient.setQueryData(['chats'], [...previousChats, res[0]]);
				}
			},
			onError(err: any) {
				console.error(err.chat);
			},
		}
	);

	return {
		createMutationChat,
	};
};
