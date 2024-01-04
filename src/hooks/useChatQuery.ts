import { useQuery } from '@tanstack/react-query';

import supabase from '@/libs/supabase';
import { FetchChat } from '@/schemas/chat';

export const useChatQuery = () => {
	const getSelectorAll = async () => {
		const { data, error } = await supabase
			.from('Chats')
			.select('*')
			.order('createdAt', { ascending: false });
		if (error) {
			throw new Error(error.message);
		}
		return data;
	};

	const getAllChats = useQuery<FetchChat[], Error>({
		queryKey: ['query:chats'],
		queryFn: getSelectorAll,
		staleTime: Infinity,
		refetchInterval: 250,
	});

	return { getAllChats };
};
