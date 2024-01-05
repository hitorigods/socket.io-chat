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
		console.log('data', data);

		return data;
	};

	const getQueryChats = useQuery({
		queryKey: ['query:chats'],
		queryFn: query,
		staleTime: Infinity,
		refetchInterval: 10000,
	});

	return { getQueryChats };
};
