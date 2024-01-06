import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import supabase from '@/libs/supabase';
import { atomChatItems } from '@/stores/atoms';
import { ChatSchema } from '@/features/chats/chatSchemas';

export const useChatQuery = () => {
	const [, setStateChatItems] = useAtom(atomChatItems);

	const query = async () => {
		const { data, error } = await supabase
			.from('Chats')
			.select(
				`id, title, published, createdAt, updatedAt,
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
		setStateChatItems(processedData);

		return processedData;
	};

	const getQueryChats = useQuery({
		queryKey: ['query:chats'],
		queryFn: query,
		staleTime: Infinity,
		// staleTime: Infinity,
		// refetchInterval: 10000,
	});

	return { getQueryChats };
};
