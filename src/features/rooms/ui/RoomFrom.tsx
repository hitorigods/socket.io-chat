'use client';

import React, { useState } from 'react';

import { useRoomEnter } from '../useRoomEnter';
import InputButton from '@/components/buttons/InputButton';

export default function RoomFrom() {
	const [roomName, setRoomName] = useState('');
	const { handleSubmit } = useRoomEnter();

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		event.preventDefault();
		setRoomName(event.target.value);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<InputButton
					label="作成"
					name="name"
					placeholder="チャットルーム名を入力してください"
					value={roomName}
					disabled={!roomName}
					onChange={handleChange}
				/>
			</form>
		</>
	);
}
