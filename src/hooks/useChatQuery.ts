import { useQuery } from '@tanstack/react-query';

import supabase from '@/libs/supabase';

export const useChatQuery = () => {
	const query = async () => {
		const { data, error } = await supabase
			.from('Chats')
			.select(
				`id, title, published, createdAt, updatedAt, Profile_id,
					Profiles!inner (
						nickname, avatarUrl
					)
				`
			)
			.order('createdAt', { ascending: false });
		if (error) {
			throw new Error(error.message);
		}
		return data;
	};

	const getQueryChats = useQuery({
		queryKey: ['query:chats'],
		queryFn: query,
		staleTime: 0,
		// staleTime: Infinity,
		// refetchInterval: 10000,
	});

	return { getQueryChats };
};
