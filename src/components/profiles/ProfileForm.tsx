'use client';

import { useState, FormEvent } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAtom } from 'jotai';

import supabase from '@/libs/supabase';
import { useProfileMutate } from '@/hooks/useProfileMutate';
import { UserSchema } from '@/schemas/users';
import { RowProfile, UpdateProfile } from '@/schemas/profiles';
import { atomSocket, atomUser } from '@/stores/atoms';

export default function ProfileFrom() {
	const {
		profileNickname,
		setProfileNickname,
		profileAvatarUrl,
		setProfileAvatarUrl,
		createProfileMutaion,
		updateProfileMutaion,
		deleteProfileMutaion,
	} = useProfileMutate();
	const [stateUser, setStateUser] = useAtom(atomUser);
	const [uploadImage, setUploadImage] = useState<File>();
	const [hasProfile, setHasProfile] = useState(false);
	const router = useRouter();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const {
			data: { session },
		} = await supabase.auth.getSession();
		if (!session) {
			throw new Error('ログインしてください');
		}

		const userID = session.user.id;
		if (!userID) {
			throw new Error('ユーザーIDがありません');
		}

		//TODO: アップロードした画像ファイルをSupabaseにアップロードしてURLを取得する
		if (uploadImage) {
			setProfileAvatarUrl('https://avatars.github/xxxxx.png');
		}

		if (hasProfile) {
			let profileData;
			try {
				const { data, error } = await supabase
					.from('Profiles')
					.select()
					.eq('User_id', userID)
					.limit(1)
					.single();
				profileData = data;
			} catch (error) {}

			if (!profileData) {
				await router.push('/auth');
				router.refresh();
				return;
			}

			const newRow: RowProfile = {
				...profileData,
				nickname: profileNickname,
				avatarUrl: profileAvatarUrl,
			};
			await updateProfileMutaion.mutate(newRow);
		} else {
			const row = {
				nickname: profileNickname,
				avatarUrl: profileAvatarUrl,
				User_id: userID,
			};
			await createProfileMutaion.mutate(row);
			await router.push('/');
			router.refresh();
		}
	};

	return (
		<div className="">
			<form onSubmit={handleSubmit}>
				<div>
					<input
						className="text-dark"
						type="text"
						value={profileNickname}
						placeholder="ニックネームを入力してください"
						required
						onChange={(event) => setProfileNickname(event.target.value)}
					/>
				</div>

				<div>
					<input
						className="text-dark"
						type="file"
						accept="image/*"
						onChange={(event) => {
							if (!event.target.files) return;
							const img: File = event.target.files[0];
							setUploadImage(img);
						}}
					/>
				</div>

				<button
					type="submit"
					className=""
				>
					<span className="">更新</span>
				</button>
			</form>
		</div>
	);
}
