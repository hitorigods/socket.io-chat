'use client';

import React from 'react';

import { useRoomEnter } from '@/features/rooms/useRoomEnter';
import SubmitButton from '@/components/buttons/SubmitButton';

export default function RoomItem() {
	const { handleSubmit } = useRoomEnter();
	return (
		<>
			<SubmitButton
				label="入室"
				isTypeButton={true}
				onClick={handleSubmit}
			/>
		</>
	);
}
