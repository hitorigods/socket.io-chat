'use client';

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAtom } from 'jotai';

import supabase from '@/utils/libs/supabase';
import { userAtom } from '@/features/users/userAtom';
import { useProfileMutate } from '@/features/profiles/useProfileMutate';
import { RowProfile } from '@/features/profiles/profileSchemas';
import { useClientUploadImage } from '@/utils/hooks/useUploadImage';

import imgAvaterDefault from '@/assets/icons/avater.svg';
import SubmitButton from '@/components/buttons/SubmitButton';

export default function ProfileFrom() {
	const router = useRouter();
	const {
		profileNickname,
		setProfileNickname,
		profileAvatarUrl,
		setProfileAvatarUrl,
		createProfileMutaion,
		updateProfileMutaion,
	} = useProfileMutate();
	const [userState] = useAtom(userAtom);
	const {
		handleClientUpload,
		clientUploadtRef,
		clientUploadObjectURL,
		clientUploadFile,
		clientUploadFileName,
	} = useClientUploadImage();

	const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		setProfileNickname(userState?.nickname || '');
	};

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

	useLayoutEffect(() => {
		setProfileNickname(userState?.nickname || '');
		setProfileAvatarUrl(userState?.avatarUrl || imgAvaterDefault);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		console.log('clientUploadObjectURL', clientUploadObjectURL);
		console.log('clientUploadFile', clientUploadFile);

		if (clientUploadObjectURL) {
			setProfileAvatarUrl(clientUploadObjectURL);
		} else {
			setProfileAvatarUrl(userState?.avatarUrl || imgAvaterDefault);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clientUploadObjectURL]);

	return (
		<div className="rounded-3xl bg-dark/50 p-[theme(spacing.content)]">
			<form
				className="grid gap-[theme(spacing.content)] "
				onSubmit={handleSubmit}
			>
				<div
					className="mx-auto flex w-[800px] max-w-full
					[&>*:first-child]:border-0 [&>*]:border-l-[1px]
					[&>*]:border-white/75"
				>
					<div className="grid flex-1 content-between justify-items-center gap-[theme(spacing.md)] px-[theme(spacing.default)]">
						<p className="text-xl tracking-wide">ニックネーム</p>
						<input
							className="h-[50px] w-[300px] max-w-full rounded-md px-[theme(spacing.xs)] text-dark transition-colors duration-300 ease-in-out"
							name="nickname"
							type="text"
							value={profileNickname}
							placeholder="ニックネームを入力"
							autoComplete={'off'}
							required
							onChange={(event) => setProfileNickname(event.target.value)}
						/>
						<button
							className=""
							onClick={handleReset}
						>
							<span className="text-sm">キャンセル</span>
						</button>
					</div>
					<div className="grid flex-1 content-between justify-items-center gap-[theme(spacing.md)] px-[theme(spacing.default)]">
						<p className="text-xl tracking-wide">アイコン画像</p>
						<label
							className="group grid cursor-pointer gap-[theme(spacing.sm)]"
							tabIndex={0}
						>
							{profileAvatarUrl && (
								<span
									className="flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-full transition-all duration-300 ease-in-out
								[&>img]:h-full [&>img]:w-full [&>img]:object-contain"
								>
									<Image
										src={profileAvatarUrl}
										alt={clientUploadFileName}
										width={100}
										height={100}
									/>
								</span>
							)}
							<span
								className="hidden"
								ref={clientUploadtRef}
							/>
							<input
								className="hidden text-white"
								name="avatarUrl"
								type="file"
								accept="image/*"
								onChange={handleClientUpload}
							/>
							<span
								role="button"
								className="grid h-[30px] w-full place-content-center place-items-center rounded-md bg-primary py-[10px] text-dark transition-all duration-300 ease-in-out
								hover:bg-dark hover:text-white
								group-hover:bg-dark group-hover:text-white
							"
							>
								<span className="block text-xs tracking-wide">
									ファイルを選択
								</span>
							</span>
						</label>
						<p className="text-sm">
							{clientUploadFileName || '選択されてません'}
						</p>
					</div>
				</div>

				<div className="grid justify-center">
					<div className="w-[350px] max-w-full">
						<SubmitButton
							label={userState && userState.nickname ? '更新' : '登録'}
							isSubmit={false}
							isDisabled={!profileNickname}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}
