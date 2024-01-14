import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import supabase from '@/utils/libs/supabase';
import { userAtom } from '@/features/users/userAtom';
import { roomItemsAtom, roomEditedAtom } from '@/features/rooms/roomAtom';
import {
	RowRoom,
	InsertRoom,
	UpdateRoom,
	RoomSchema,
} from '@/features/rooms/roomSchemas';

export const useRoomMutate = () => {
	const queryClient = useQueryClient();
	const [userState] = useAtom(userAtom);
	const [, setRoomItemsState] = useAtom(roomItemsAtom);
	const [, setRoomEditedState] = useAtom(roomEditedAtom);

	const reset = () => {
		setRoomEditedState(null);
	};

	/**
	 * ルームを作成する
	 */
	const createRoomMutation = useMutation({
		mutationFn: async (row: InsertRoom) => {
			const { data, error } = await supabase.from('Rooms').insert(row).select();
			if (error) throw new Error(error.message);
			return data;
		},
		onSuccess: (result: RowRoom[]) => {
			if (!userState) throw new Error('ログインが確認できませんでした');
			// ステートの更新
			const { id, name, published, Chat_count, User_id, createdAt, updatedAt } =
				result[0];
			const newData = {
				id,
				name,
				published,
				Chat_count,
				User_id,
				createdAt,
				updatedAt,
			};
			setRoomItemsState((state) => [newData, ...state]);

			// クエリの更新
			const previousData = queryClient.getQueryData<RoomSchema[]>([
				'query:rooms',
			]);
			if (previousData && result != null) {
				const newData = [...previousData, result[0]];
				queryClient.setQueryData(['query:rooms'], newData);
			}

			alert('ルームを作成しました');
			reset();
		},
		onError(error: any) {
			alert(error.message);
			reset();
		},
	});

	/**
	 * ルームを更新する
	 */
	const updateRoomMutation = useMutation({
		mutationFn: async (row: UpdateRoom) => {
			const { data, error } = await supabase
				.from('Rooms')
				.update({ name: row.name })
				.eq('id', row.id || '')
				.select();
			if (error) throw new Error(error.message);
			queryClient.invalidateQueries({ queryKey: ['query:rooms'] });
			return data;
		},
		onSuccess: (result: RowRoom[], variables: UpdateRoom) => {
			// ステートの更新
			const newData = {
				...variables,
			};
			setRoomItemsState((state) =>
				state.map((row) => {
					if (variables.id === row.id) {
						return { ...row, ...newData };
					} else {
						return row;
					}
				})
			);

			// クエリの更新
			const previousData = queryClient.getQueryData<UpdateRoom[]>([
				'query:rooms',
			]);
			if (previousData && result != null) {
				const newData = previousData.map((row) =>
					row.id === variables?.id ? result[0] : row
				);
				queryClient.setQueryData(['query:rooms'], newData);
			}
			alert('ルームを更新しました');
			reset();
		},
		onError(error: any) {
			alert(error.message);
			reset();
		},
	});

	/**
	 * ルームを削除する
	 */
	const deleteRoomMutation = useMutation({
		mutationFn: async (id: string) => {
			const { data, error } = await supabase
				.from('Rooms')
				.delete()
				.eq('id', id);
			if (error) throw new Error(error.message);
			return data;
		},
		onSuccess: (_, variables) => {
			// ステートの更新
			const newData = {
				id: variables,
			};
			setRoomItemsState((state) => state.filter((row) => variables !== row.id));

			// クエリの更新
			const previousData = queryClient.getQueryData<UpdateRoom[]>([
				'query:rooms',
			]);
			if (previousData) {
				queryClient.setQueryData(
					['query:rooms'],
					previousData.filter((row) => row.id !== variables)
				);
			}

			alert('ルームを削除しました');
			reset();
		},
		onError(error: any) {
			alert(error.message);
			reset();
		},
	});

	return {
		createRoomMutation,
		updateRoomMutation,
		deleteRoomMutation,
	};
};
