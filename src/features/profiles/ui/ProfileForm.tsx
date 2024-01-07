'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import supabase from '@/utils/libs/supabase';
import { userAtom } from '@/features/users/userAtom';
import { useProfileMutate } from '@/features/profiles/useProfileMutate';
import { RowProfile } from '@/features/profiles/profileSchemas';
import { useUploadImage } from '@/utils/hooks/useUploadImage';

import imgAvaterDefault from '@/assets/icons/avater.svg';

export default function ProfileFrom() {
	const {
		profileNickname,
		setProfileNickname,
		profileAvatarUrl,
		setProfileAvatarUrl,
		createProfileMutaion,
		updateProfileMutaion,
	} = useProfileMutate();
	const [userState] = useAtom(userAtom);
	const { handleUploadImage, uplpadImageRef } = useUploadImage();

	const router = useRouter();

	useLayoutEffect(() => {
		if (!userState) return;
		setProfileNickname(userState.nickname);
	}, [userState]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const {
			data: { session },
		} = await supabase.auth.getSession();
		if (!session) {
			throw new Error('サインインしてください');
		}

		//TODO: アップロードした画像ファイルをSupabaseにアップロードしてURLを取得する

		console.log('userState', userState);

		// プロフィール作成済みの場合
		if (userState && userState.nickname) {
			const { data: profileData, error } = await supabase
				.from('Profiles')
				.select()
				.eq('User_id', userState.id)
				.limit(1)
				.single();

			if (error) {
				await router.push('/auth');
				return;
			}

			const newRow: RowProfile = {
				...profileData,
				nickname: profileNickname,
				avatarUrl: profileAvatarUrl,
			};
			await updateProfileMutaion.mutate(newRow);

			// プロフィール新規作成の場合
		} else {
			const userID = session.user.id;
			if (!userID) {
				throw new Error('ユーザーIDがありません');
			}
			const row = {
				nickname: profileNickname,
				avatarUrl: profileAvatarUrl,
				User_id: userID,
			};
			await createProfileMutaion.mutate(row);
			await router.push('/');
		}
	};

	return (
		<div className="">
			<form onSubmit={handleSubmit}>
				<div className="">
					<div className="">
						<input
							className="text-dark"
							name="nickname"
							type="text"
							value={profileNickname}
							placeholder="ニックネームを入力してください"
							required
							onChange={(event) => setProfileNickname(event.target.value)}
						/>
					</div>
					<div className="">
						<label>
							<input
								className="text-white"
								name="avatarUrl"
								type="file"
								accept="image/*"
								onChange={handleUploadImage}
							/>
							<span ref={uplpadImageRef} />
						</label>
					</div>
				</div>

				<div className="grid justify-center">
					<div className="w-[400px] max-w-full">
						<button
							className="grid h-[80px] w-full place-items-center rounded-md bg-primary py-[10px] text-dark transition-all duration-300 ease-in-out
							hover:bg-dark hover:text-white
						"
							type="submit"
						>
							<span className="block indent-[.75em] text-3xl font-bold tracking-[.75em]">
								{userState && userState.nickname ? '更新' : '登録'}
							</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
