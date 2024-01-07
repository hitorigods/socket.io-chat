import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import supabase from '@/utils/libs/supabase';
import {
	RowChat,
	InsertChat,
	UpdateChat,
	ChatSchema,
} from '@/features/chats/chatSchemas';
import {
	chatEditedAtom,
	chatSocketAtom,
	chatItemsAtom,
} from '@/features/chats/chatAtom';
import { userAtom } from '@/features/users/userAtom';

export const useChatMutate = () => {
	const queryClient = useQueryClient();
	const [userState] = useAtom(userAtom);
	const [, setChatEditedState] = useAtom(chatEditedAtom);
	const [, setChatSocketState] = useAtom(chatSocketAtom);
	const [, setChatItemsState] = useAtom(chatItemsAtom);

	const reset = () => {
		setChatEditedState(null);
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
		onSuccess: (result: RowChat[]) => {
			if (!userState) throw new Error('ログインが確認できませんでした');
			// ステートの更新
			const { id, title, published, createdAt, updatedAt, User_id } = result[0];
			const { nickname, avatarUrl } = userState;
			const socketData = {
				id,
				title,
				published,
				createdAt,
				updatedAt,
				User_id,
				Profiles: {
					nickname,
					avatarUrl,
				},
			};
			setChatSocketState({ type: 'create', data: socketData });
			setChatItemsState((state) => [socketData, ...state]);

			// クエリの更新
			const previousData = queryClient.getQueryData<ChatSchema[]>([
				'query:chats',
			]);
			if (previousData && result != null) {
				const newData = [...previousData, result[0]];
				queryClient.setQueryData(['query:chats'], newData);
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
		onSuccess: (result: RowChat[], variables: UpdateChat) => {
			// ステートの更新
			const socketData = {
				...variables,
			};
			setChatSocketState({ type: 'update', data: socketData });
			setChatItemsState((state) =>
				state.map((item) => {
					if (variables.id === item.id) {
						return { ...item, ...socketData };
					} else {
						return item;
					}
				})
			);

			// クエリの更新
			const previousData = queryClient.getQueryData<UpdateChat[]>([
				'query:chats',
			]);
			if (previousData && result != null) {
				const newData = previousData.map((row) =>
					row.id === variables?.id ? result[0] : row
				);
				queryClient.setQueryData(['query:chats'], newData);
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
			// ステートの更新
			const socketData = {
				id: variables,
			};
			setChatSocketState({ type: 'delete', data: socketData });
			setChatItemsState((state) =>
				state.filter((item) => variables !== item.id)
			);

			// クエリの更新
			const previousData = queryClient.getQueryData<UpdateChat[]>([
				'query:chats',
			]);
			if (previousData) {
				queryClient.setQueryData(
					['query:chats'],
					previousData.filter((row) => row.id !== variables)
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
