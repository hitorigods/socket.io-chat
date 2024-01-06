import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import supabase from '@/libs/supabase';
import {
	RowChat,
	InsertChat,
	UpdateChat,
	ChatSchema,
} from '@/features/chats/chatSchemas';
import {
	atomUser,
	atomEditedChat,
	atomSocketChat,
	atomChatItems,
} from '@/stores/atoms';

export const useChatMutate = () => {
	const queryClient = useQueryClient();
	const [stateUser] = useAtom(atomUser);
	const [, setEditedChat] = useAtom(atomEditedChat);
	const [, setStateSocketChat] = useAtom(atomSocketChat);
	const [stateChatItems, setStateChatItems] = useAtom(atomChatItems);

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
		onSuccess: (result: RowChat[]) => {
			// ステートの更新
			const { id, title, published, createdAt, updatedAt } = result[0];
			const { nickname, avatarUrl } = stateUser;
			const socketData = {
				id,
				title,
				published,
				createdAt,
				updatedAt,
				Profiles: {
					nickname,
					avatarUrl,
				},
			};
			setStateSocketChat({ type: 'create', data: socketData });
			setStateChatItems((state) => [socketData, ...state]);

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
			setStateSocketChat({ type: 'update', data: socketData });
			setStateChatItems((state) =>
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
			setStateSocketChat({ type: 'delete', data: socketData });
			setStateChatItems((state) =>
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
