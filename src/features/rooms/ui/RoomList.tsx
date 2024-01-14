'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { userAtom } from '@/features/users/userAtom';
import { RoomSchema } from '../roomSchemas';
import { roomItemsAtom } from '../roomAtom';
import { useRoomQuery } from '../useRoomQuery';
import RoomItem from './RoomItem';

export default function RoomList() {
	const [userState] = useAtom(userAtom);
	const [roomItemsState, setRoomItemsState] = useAtom(roomItemsAtom);

	const { getQueryRooms } = useRoomQuery();
	const { data, error, refetch, isLoading, isError } = getQueryRooms;

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="w-[800px] max-w-full">
			{data &&
				data.map((item: RoomSchema) => (
					<RoomItem
						key={item.id}
						item={item}
					/>
				))}
		</div>
	);
}
