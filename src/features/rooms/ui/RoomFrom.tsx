'use client';

import React, { useState } from 'react';
import { useAtom } from 'jotai';

import {
	roomInputAtom,
	roomEditedAtom,
	isRoomEditedAtom,
} from '@/features/rooms/roomAtom';
import { userAtom } from '@/features/users/userAtom';
import { useRoomMutate } from '@/features/rooms/useRoomMutate';
import { UpdateRoom } from '@/features/rooms/roomSchemas';
import InputButton from '@/components/buttons/InputButton';
import FormArea from '@/components/forms/FormArea';

export default function RoomFrom() {
	const [roomName, setRoomName] = useState('');
	const [userState] = useAtom(userAtom);
	const [roomInputState, setRoomInputState] = useAtom(roomInputAtom);
	const [roomEditedState] = useAtom(roomEditedAtom);
	const [isRoomEditedState, setIsRoomEditedState] = useAtom(isRoomEditedAtom);

	const { createRoomMutation, updateRoomMutation } = useRoomMutate();

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();
		if (!roomInputState) return;

		if (isRoomEditedState) {
			if (!roomEditedState) return;

			const { id, published, Chat_count } = roomEditedState;
			const newData: UpdateRoom = {
				id,
				name: roomInputState,
				published,
				Chat_count,
			};
			await updateRoomMutation.mutate(newData);
		} else {
			const newData = {
				name: roomInputState,
				// TODO: 非公開設定を追加する
				published: true,
				User_id: userState?.id || '',
			};
			await createRoomMutation.mutate(newData);
		}

		setRoomInputState('');
		setIsRoomEditedState(false);
	};

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		event.preventDefault();
		setRoomInputState(event.target.value);
	};

	return (
		<>
			<FormArea
				layoutType={'narrow'}
				onSubmit={handleSubmit}
			>
				<InputButton
					label="作成"
					name="name"
					placeholder="ルーム名を入力してください"
					value={roomInputState}
					disabled={!roomInputState}
					onChange={handleChange}
				/>
			</FormArea>
		</>
	);
}
