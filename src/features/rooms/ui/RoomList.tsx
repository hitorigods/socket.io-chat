'use client';

import React, { useEffect } from 'react';
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

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="min-w-[400px] max-w-full">
			{data && data.map((item: RoomSchema) => <RoomItem key={item.id} />)}
		</div>
	);
}
