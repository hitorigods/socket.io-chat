'use client';

import React from 'react';
import Image from 'next/image';
import { useAtom } from 'jotai';

import {
	chatInputAtom,
	chatEditedAtom,
	isChatEditedAtom,
} from '@/features/chats/chatAtom';
import { socketAtom } from '@/features/sockets/socketAtoms';
import { userAtom } from '@/features/users/userAtom';
import { useChatMutate } from '@/features/chats/useChatMutate';
import { ChatSchema } from '@/features/chats/chatSchemas';
import EditButtons from '@/components/buttons/EditButtons';
import EditButton from '@/components/buttons/EditButton';
import { useDateLocale } from '@/utils/hooks/useDateLocale';

import imgAvaterDefault from '@/assets/icons/avater.svg';

interface Props {
	item: ChatSchema;
}

export default function ChatItem({ item }: Props) {
	const { deleteChatPost } = useChatMutate();
	const [userState] = useAtom(userAtom);
	const [socketState] = useAtom(socketAtom);
	const [, setChatInputState] = useAtom(chatInputAtom);
	const [, setChatEditedState] = useAtom(chatEditedAtom);
	const [, setIsChatEditedState] = useAtom(isChatEditedAtom);

	const handleEdited: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		setChatInputState(item.title);
		setChatEditedState(item);
		setIsChatEditedState(true);
	};

	const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async (
		event
	) => {
		event.preventDefault();
		await deleteChatPost(item.id);
		socketState.emit('socket:chat', 'delete');
		console.log(`send client: chat: delete`);
		setChatInputState('');
		setIsChatEditedState(false);
	};

	const { localDate } = useDateLocale(item.updatedAt);

	return (
		<>
			<li className="flex place-items-center gap-[15px]">
				<div className="">
					<img
						src={item.Profiles?.avatarUrl || imgAvaterDefault}
						alt={item.Profiles?.nickname || 'No Name'}
						width={180}
						height={180}
						className="h-[60px] w-[60px] rounded-full object-cover"
					/>
					{/* Renderでメモリ不足になるのでImageコンポーネントは使わない
					<Image
						src={item.Profiles?.avatarUrl || imgAvaterDefault}
						alt={item.Profiles?.nickname || 'No Name'}
						width={180}
						height={180}
						className="h-[60px] w-[60px] rounded-full object-cover"
					/>
					*/}
				</div>
				<div className="grid w-[650px] max-w-full gap-[10px] break-words rounded-full bg-dark/50 px-10 py-4 text-white shadow-md transition-all duration-350 ease-in-out">
					<p className="text-base leading-normal [overflow-wrap:anywhere]">
						{item.title}
					</p>
					<div className="flex justify-between gap-[theme(spacing.default)]">
						<p className="text-xs text-white/75">{item.Profiles?.nickname}</p>
						<p className="text-xs text-white/75">{localDate}</p>
					</div>
				</div>
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
			</li>
		</>
	);
}
