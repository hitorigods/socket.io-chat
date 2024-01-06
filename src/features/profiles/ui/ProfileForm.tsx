'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import supabase from '@/libs/supabase';
import { useProfileMutate } from '@/features/profiles/useProfileMutate';
import { RowProfile } from '@/features/profiles/profileSchemas';

export default function ProfileFrom() {
	const {
		profileNickname,
		setProfileNickname,
		profileAvatarUrl,
		setProfileAvatarUrl,
		createProfileMutaion,
		updateProfileMutaion,
	} = useProfileMutate();
	const [uploadImage, setUploadImage] = useState<File>();
	const [hasProfile, setHasProfile] = useState(false);
	const router = useRouter();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const {
			data: { session },
		} = await supabase.auth.getSession();
		if (!session) {
			throw new Error('サインインしてください');
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
			await router.push('/');
			router.refresh();
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
