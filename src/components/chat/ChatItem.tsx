'use client';

import Image from 'next/image';

import { FetchChat } from '@/schemas/chat';

interface Props {
	chat: FetchChat;
}

export default function ChatItem({ chat }: Props) {
	const utcDate = new Date(chat.updatedAt);
	const localDate = utcDate.toLocaleString('ja-JP', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	});

	return (
		<>
			<li className="flex place-items-center gap-[15px]">
				<div className="">
					<Image
						src="/favicon.ico"
						alt={chat.user_id}
						width={64}
						height={64}
						className="h-16 w-16 rounded-full"
					/>
				</div>
				<div className="grid w-full max-w-[650px] gap-[10px] overflow-hidden rounded-full bg-dark/50 px-10 py-4 text-white shadow-md transition-all duration-300 ease-in-out">
					<p className="text-xl leading-normal">{chat.title}</p>
					<div className="flex justify-between gap-[20px]">
						<p className="text-xs">{chat.user_id}</p>
						<p className="text-xs">{localDate}</p>
					</div>
				</div>
				<div className="grid w-[60px] gap-[1px] overflow-hidden rounded-md">
					<button className="grid bg-dark py-[10px] indent-[.5em] text-xs font-bold tracking-[.5em] text-white">
						編集
					</button>
					<button className="grid bg-danger py-[10px] indent-[.5em] text-xs font-bold tracking-[.5em] text-white">
						削除
					</button>
				</div>
			</li>
		</>
	);
}
