import { Suspense } from 'react';

import SocketFrom from '@/features/sockets/ui/SocketFrom';
import RoomItem from '@/features/rooms/ui/RoomItem';
import AuthSignOut from '@/features/auths/ui/AuthSignOut';
import PageTitle from '@/components/layouts/PageTitle';

export default function Home() {
	return (
		<Suspense fallback="loading...">
			<PageTitle
				label="Top"
				caption="トップ"
			/>
			<div className="grid justify-center gap-[40px] px-[20px]">
				<div className="min-w-[400px] max-w-full">
					<RoomItem />
				</div>
				{/* <SocketFrom /> */}
				<AuthSignOut />
			</div>
		</Suspense>
	);
}
