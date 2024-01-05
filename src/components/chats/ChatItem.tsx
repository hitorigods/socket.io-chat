'use client';

import React, { MouseEventHandler } from 'react';
import Image from 'next/image';
import { useAtom } from 'jotai';

import {
	atomSocket,
	atomInputChat,
	atomEditedChat,
	atomIsEditedChat,
} from '@/stores/atoms';
import { useChatMutate } from '@/hooks/useChatMutate';
import { useDateLocale } from '@/hooks/useDateLocale';
import { ChatSchema } from '@/schemas/chats';
import EditButton from '../buttons/EditButton';

interface Props {
	data: ChatSchema;
}

export default function ChatItem({ data }: Props) {
	const { deleteChatMutation } = useChatMutate();
	const [stateSocket] = useAtom(atomSocket);
	const [, setStateInputChat] = useAtom(atomInputChat);
	const [, setStateEditedChat] = useAtom(atomEditedChat);
	const [, setStateIsEditedChat] = useAtom(atomIsEditedChat);

	const editedHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();

		setStateInputChat(data.title);
		setStateEditedChat(data);
		setStateIsEditedChat(true);
	};

	const deleteHandler: MouseEventHandler<HTMLButtonElement> = async (event) => {
		event.preventDefault();
		await deleteChatMutation.mutate(data.id);
		stateSocket.emit('socket:chat', 'delete');
		console.log(`send client: chat: delete`);
		setStateInputChat('');
		setStateIsEditedChat(false);
	};

	const localDate = useDateLocale(data.updatedAt);

	return (
		<>
			<li className="flex place-items-center gap-[15px]">
				<div className="">
					<Image
						src={data.Profiles?.avatarUrl || '/favicon.ico'}
						alt={data.Profiles?.nickname || 'no name'}
						width={64}
						height={64}
						className="h-16 w-16 rounded-full"
					/>
				</div>
				<div className="grid w-[650px] max-w-full gap-[10px] overflow-hidden rounded-full bg-dark/50 px-10 py-4 text-white shadow-md transition-all duration-300 ease-in-out">
					<p className="text-xl leading-normal">{data.title}</p>
					<div className="flex justify-between gap-[20px]">
						<p className="text-xs">{data.Profiles?.nickname}</p>
						<p className="text-xs">{localDate}</p>
					</div>
				</div>
				<div className="grid w-[60px] gap-[1px] overflow-hidden rounded-md">
					<EditButton
						label="編集"
						onClick={editedHandler}
					/>
					<EditButton
						label="削除"
						type="danger"
						onClick={deleteHandler}
					/>
				</div>
			</li>
		</>
	);
}
