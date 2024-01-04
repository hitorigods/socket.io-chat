'use client';

import React, { MouseEventHandler } from 'react';
import Image from 'next/image';
import { useAtom } from 'jotai';

import {
	atomInputChat,
	atomEditedChat,
	atomIsEditedChat,
} from '@/stores/atoms';
import { useChatMutate } from '@/hooks/useChatMutate';
import { useDateLocale } from '@/hooks/useDateLocale';
import { FetchChat } from '@/schemas/chat';

interface Props {
	chat: FetchChat;
}

export default function ChatItem({ chat }: Props) {
	const { deleteChatMutation } = useChatMutate();
	const [, setStateInputChat] = useAtom(atomInputChat);
	const [, setStateEditedChat] = useAtom(atomEditedChat);
	const [, setStateIsEditedChat] = useAtom(atomIsEditedChat);

	const editedHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();

		setStateIsEditedChat(true);
		setStateEditedChat(chat);
		setStateInputChat(chat.title);
	};

	const deleteHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		deleteChatMutation.mutate(chat.id);
	};

	const localDate = useDateLocale(chat.updatedAt);

	return (
		<>
			<li className="flex place-items-center gap-[15px]">
				<div className="">
					<Image
						src="/favicon.ico"
						alt={chat.User_id}
						width={64}
						height={64}
						className="h-16 w-16 rounded-full"
					/>
				</div>
				<div className="grid w-[650px] max-w-full gap-[10px] overflow-hidden rounded-full bg-dark/50 px-10 py-4 text-white shadow-md transition-all duration-300 ease-in-out">
					<p className="text-xl leading-normal">{chat.title}</p>
					<div className="flex justify-between gap-[20px]">
						<p className="text-xs">{chat.User_id}</p>
						<p className="text-xs">{localDate}</p>
					</div>
				</div>
				<div className="grid w-[60px] gap-[1px] overflow-hidden rounded-md">
					<button
						className="grid bg-dark py-[10px] indent-[.5em] text-xs font-bold tracking-[.5em] text-white"
						onClick={editedHandler}
					>
						編集
					</button>
					<button
						className="grid bg-danger py-[10px] indent-[.5em] text-xs font-bold tracking-[.5em] text-white"
						onClick={deleteHandler}
					>
						削除
					</button>
				</div>
			</li>
		</>
	);
}
