'use client';

import React, { MouseEventHandler } from 'react';
import Image from 'next/image';
import { useAtom } from 'jotai';

import {
	atomUser,
	atomSocket,
	atomInputChat,
	atomEditedChat,
	atomIsEditedChat,
} from '@/stores/atoms';
import { useChatMutate } from '@/features/chats/useChatMutate';
import { ChatSchema } from '@/features/chats/chatSchemas';
import EditButton from '@/components/buttons/EditButton';
import { useDateLocale } from '@/utils/validates/useDateLocale';

import imgAvaterDefault from '@/assets/icons/avater.svg';

interface Props {
	item: ChatSchema;
}

export default function ChatItem({ item }: Props) {
	const { deleteChatMutation } = useChatMutate();
	const [stateUser] = useAtom(atomUser);
	const [stateSocket] = useAtom(atomSocket);
	const [, setStateInputChat] = useAtom(atomInputChat);
	const [, setStateEditedChat] = useAtom(atomEditedChat);
	const [, setStateIsEditedChat] = useAtom(atomIsEditedChat);

	const handleEdited: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();

		setStateInputChat(item.title);
		setStateEditedChat(item);
		setStateIsEditedChat(true);
	};

	const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
		event.preventDefault();
		await deleteChatMutation.mutate(item.id);
		stateSocket.emit('socket:chat', 'delete');
		console.log(`send client: chat: delete`);
		setStateInputChat('');
		setStateIsEditedChat(false);
	};

	const localDate = useDateLocale(item.updatedAt);

	return (
		<>
			<li className="flex place-items-center gap-[15px]">
				<div className="">
					<Image
						src={item.Profiles?.avatarUrl || imgAvaterDefault}
						alt={item.Profiles?.nickname || 'No Name'}
						width={64}
						height={64}
						className="h-16 w-16 rounded-full"
					/>
				</div>
				<div className="grid w-[650px] max-w-full gap-[10px] rounded-full bg-dark/50 px-10 py-4 text-white shadow-md transition-all duration-300 ease-in-out">
					<p className="text-xl leading-normal">{item.title}</p>
					<div className="flex justify-between gap-[20px]">
						<p className="text-xs">{item.Profiles?.nickname}</p>
						<p className="text-xs">{localDate}</p>
					</div>
				</div>
				{item.User_id === stateUser?.id && (
					<div
						className="grid w-[60px] gap-[1px] rounded-md
					[&>*:first-child]:rounded-t-md
					[&>*:last-child]:rounded-b-md
				"
					>
						<EditButton
							label="編集"
							onClick={handleEdited}
						/>
						<EditButton
							label="削除"
							type="danger"
							onClick={handleDelete}
						/>
					</div>
				)}
			</li>
		</>
	);
}
