import supabase from '@/utils/libs/supabase';

type Props = {
	roomId: string;
};

export const useChatQuery = () => {
	const getFetchChats = async ({ roomId }: Props) => {
		const { data, error } = await supabase
			.from('Chats')
			.select(
				`id, title, published, createdAt, updatedAt, User_id, Room_id,
				Profiles!inner (
					nickname, avatarUrl
				)
			`
			)
			.eq('Room_id', roomId || '')
			.order('createdAt', { ascending: true });
		if (error) {
			throw new Error(error.message);
		}

		const newData = data.map((item) => ({
			...item,
			Profiles: item.Profiles || { nickname: '', avatarUrl: null },
		}));

		return { data: newData, error };
	};

	return {
		getFetchChats,
	};
};
