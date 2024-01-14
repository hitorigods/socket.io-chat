import { Suspense } from 'react';

import PageTitle from '@/components/layouts/PageTitle';
import RoomList from '@/features/rooms/ui/RoomList';
import RoomFrom from '@/features/rooms/ui/RoomFrom';
import AuthSignOut from '@/features/auths/ui/AuthSignOut';

export default function Home() {
	return (
		<Suspense fallback="loading...">
			<PageTitle
				label="Top"
				caption="トップ"
			/>
			<div className="grid justify-center gap-[40px] px-[20px]">
				<RoomList />
				<RoomFrom />
				<AuthSignOut />
			</div>
		</Suspense>
	);
}
