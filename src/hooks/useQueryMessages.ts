import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';

import supabase from '@/libs/supabase';
import { FetchMessage, Message } from '@/schemas/message';

export const useQueryMessages = () => {
	const getMessages = async () => {
		const { data, error } = await supabase
			.from('message')
			.select('*')
			.order('updatedAt', { ascending: true });
		if (error) {
			throw new Error(error.message);
		}
		return data;
	};
	return useQuery<FetchMessage[], Error>({
		queryKey: ['messages'],
		queryFn: getMessages,
		staleTime: Infinity,
	});
};
