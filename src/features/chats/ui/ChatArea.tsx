'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { socketAtom } from '@/features/sockets/socketAtoms';
import { userAtom } from '@/features/users/userAtom';
import { chatItemsAtom, isChatUpdatedAtom } from '@/features/chats/chatAtom';
import { useChatQuery } from '@/features/chats/useChatQuery';
import ChatList from '@/features/chats/ui/ChatList';
import ChatForm from '@/features/chats/ui/ChatForm';

type Props = {
	roomId: string;
};

export default function ChatArea({ roomId }: Props) {
	const router = useRouter();
	const [socketState] = useAtom(socketAtom);
	const [userState] = useAtom(userAtom);
	const [chatItemsState, setChatItemsState] = useAtom(chatItemsAtom);
	const [, setIsChatUpdatedState] = useAtom(isChatUpdatedAtom);
	const { getFetchChats } = useChatQuery();

	useEffect(() => {
		if (!socketState) {
			router.push('/');
			return;
		}
		(async () => {
			const { data, error } = await getFetchChats({
				roomId,
			});
			setChatItemsState(data);
			setIsChatUpdatedState(true);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="grid grid-rows-[1fr_auto] content-between gap-[theme(spacing.xl)]">
				<ChatList chatItems={chatItemsState} />
				<ChatForm
					userState={userState}
					roomId={roomId}
				/>
			</div>
		</>
	);
}
