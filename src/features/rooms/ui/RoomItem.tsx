'use client';

import React from 'react';
import { useAtom } from 'jotai';

import { useRoomEnter } from '@/features/rooms/useRoomEnter';
import EditButtons from '@/components/buttons/EditButtons';
import EditButton from '@/components/buttons/EditButton';
import { userAtom } from '@/features/users/userAtom';
import { roomInputAtom, roomEditedAtom, isRoomEditedAtom } from '../roomAtom';
import { RoomSchema } from '../roomSchemas';
import { useRoomMutate } from '../useRoomMutate';

type Props = {
	item: RoomSchema;
};

export default function RoomItem({ item }: Props) {
	const [userState] = useAtom(userAtom);
	const { deleteRoomMutation } = useRoomMutate();
	const [, setRoomInputState] = useAtom(roomInputAtom);
	const [, setRoomEditedState] = useAtom(roomEditedAtom);
	const [, setIsRoomEditedState] = useAtom(isRoomEditedAtom);
	const { handleSubmit } = useRoomEnter({ roomId: item.id });

	const handleEdited: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		setRoomInputState(item.name);
		setRoomEditedState(item);
		setIsRoomEditedState(true);
	};

	const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async (
		event
	) => {
		event.preventDefault();
		await deleteRoomMutation.mutate(item.id);
		setRoomInputState('');
		setIsRoomEditedState(false);
	};

	return (
		<div className="flex justify-between border-b-[1px] border-solid border-b-white">
			<button
				className="grid h-[60px] w-full content-center justify-start transition-colors duration-350 ease-in-out"
				type="button"
				onClick={handleSubmit}
			>
				<span className="block text-2xl font-medium tracking-wider">
					{item.name}
				</span>
			</button>

			{item.User_id === userState?.id && (
				<EditButtons>
					<EditButton
						label="編集"
						onClick={handleEdited}
					/>
					<EditButton
						label="削除"
						type="danger"
						onClick={handleDelete}
					/>
				</EditButtons>
			)}
		</div>
	);
}
