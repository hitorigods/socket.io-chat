import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import supabase from '@/utils/libs/supabase';
import { chatItemsAtom } from '@/features/chats/chatAtom';
import { ChatSchema } from '@/features/chats/chatSchemas';

export const useChatQuery = () => {
	const [, setChatItemsState] = useAtom(chatItemsAtom);

	const queryFn = async () => {
		const { data, error } = await supabase
			.from('Chats')
			.select(
				`id, title, published, createdAt, updatedAt, User_id,
					Profiles!inner (
						nickname, avatarUrl
					)
				`
			)
			.order('createdAt', { ascending: false });
		if (error) {
			throw new Error(error.message);
		}

		const processedData = data.map((item) => ({
			...item,
			Profiles: item.Profiles || { nickname: '', avatarUrl: null },
		}));
		setChatItemsState(processedData);

		return processedData;
	};

	const getQueryChats = useQuery({
		queryKey: ['query:chats'],
		queryFn,
		// staleTime: Infinity,
		// refetchInterval: 10000,
	});

	return { getQueryChats };
};
