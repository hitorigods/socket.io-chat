import { useAtom } from 'jotai';

import supabase from '@/utils/libs/supabase';
import { userAtom } from '@/features/users/userAtom';
import {
	chatEditedAtom,
	chatSocketAtom,
	chatItemsAtom,
} from '@/features/chats/chatAtom';
import { InsertChat, UpdateChat } from '@/features/chats/chatSchemas';

export const useChatMutate = () => {
	const [userState] = useAtom(userAtom);
	const [, setChatEditedState] = useAtom(chatEditedAtom);
	const [, setChatSocketState] = useAtom(chatSocketAtom);
	const [, setChatItemsState] = useAtom(chatItemsAtom);

	const reset = () => {
		setChatEditedState(null);
	};

	/**
	 * チャットデータを取得する
	 */
	const createChatPost = async (row: InsertChat) => {
		const { data, error } = await supabase.from('Chats').insert(row).select();
		if (error) throw new Error(error.message);

		if (!userState) throw new Error('ログインが確認できませんでした');
		// ステートの更新
		const { id, title, published, createdAt, updatedAt, User_id, Room_id } =
			data[0];
		const { nickname, avatarUrl } = userState;
		const newData = {
			id,
			title,
			published,
			createdAt,
			updatedAt,
			User_id,
			Room_id,
			Profiles: {
				nickname,
				avatarUrl,
			},
		};
		setChatSocketState({ type: 'create', data: newData });
		setChatItemsState((state) => [...state, newData]);

		alert('チャットを投稿しました');
		return { data: newData, error };
	};

	/**
	 * チャットデータを更新する
	 */
	const updateChatPost = async (row: UpdateChat) => {
		const { data, error } = await supabase
			.from('Chats')
			.update({ title: row.title })
			.eq('id', row.id || '')
			.select();
		if (error) throw new Error(error.message);

		// ステートの更新
		const newData = {
			...row,
		};
		setChatSocketState({ type: 'update', data: newData });
		setChatItemsState((state) =>
			state.map((row) => {
				if (newData.id === row.id) {
					return { ...row, ...newData };
				} else {
					return row;
				}
			})
		);

		alert('チャットを更新しました');
		reset();

		return { data: newData, error };
	};
	/**
	 * チャットデータを削除する
	 */
	const deleteChatPost = async (id: string) => {
		const { data, error } = await supabase.from('Chats').delete().eq('id', id);
		if (error) throw new Error(error.message);

		const newData = {
			id,
		};
		setChatSocketState({ type: 'delete', data: newData });
		setChatItemsState((state) => state.filter((row) => id !== row.id));

		alert('チャットを削除しました');
		reset();

		return { data: newData, error };
	};

	return {
		createChatPost,
		updateChatPost,
		deleteChatPost,
	};
};
