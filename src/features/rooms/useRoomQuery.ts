import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import supabase from '@/utils/libs/supabase';
import { roomItemsAtom } from '@/features/rooms/roomAtom';

export const useRoomQuery = () => {
	const [roomItemsState, setRoomItemsState] = useAtom(roomItemsAtom);

	const getFetchRooms = async () => {
		const { data, error } = await supabase
			.from('Rooms')
			.select(`id, name, published, Chat_count, User_id, createdAt, updatedAt`)
			.order('createdAt', { ascending: true });
		if (error) {
			throw new Error(error.message);
		}

		const newData = data.map((item) => ({
			...item,
		}));
		setRoomItemsState(newData);

		return { data: newData, error };
	};

	const queryFn = async () => {
		const { data } = await getFetchRooms();
		return data;
	};

	const getQueryRooms = useQuery({
		queryKey: ['query:rooms'],
		queryFn,
		staleTime: Infinity,
		// refetchInterval: 10000,
	});

	return {
		getFetchRooms,
		getQueryRooms,
	};
};
