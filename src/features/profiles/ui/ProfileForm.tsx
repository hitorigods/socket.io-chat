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
import { fileSizeUnit } from '@/utils/helpers/fileSizeUnit';

import imgAvaterDefault from '@/assets/icons/avater.svg';
import SubmitButton from '@/components/buttons/SubmitButton';

export default function ProfileFrom() {
	const router = useRouter();
	const [previewFileStatus, setPreviewFileStatus] = useState('');
	const [isPreviewFileError, setIsPreviewFileError] = useState(false);
	const [userState, setUserState] = useAtom(userAtom);
	const {
		profileNickname,
		setProfileNickname,
		profileAvatarUrl,
		setProfileAvatarUrl,
		createProfileMutaion,
		updateProfileMutaion,
	} = useProfileMutate();
	const {
		handleClientUpload,
		clientUploadtRef,
		clientUploadObjectURL,
		clientUploadFile,
		clientUploadFileName,
	} = useClientUploadImage();

	const serverImageUpload = async () => {
		if (
			!clientUploadFile ||
			!clientUploadFile.name ||
			!userState?.id ||
			isPreviewFileError
		)
			return;
		const [ext, ...fileName] = clientUploadFile.name.split('.').reverse();
		const filePath = `${
			userState.id
		}/${Date.now()}_${crypto.randomUUID()}.${ext}`;
		console.log('filePath', filePath);

		const { error } = await supabase.storage
			.from('avaters')
			.upload(filePath, clientUploadFile);
		if (error) {
			alert('画像がアップロードできませんでした');
			console.error('error', error);
			throw new Error('画像がアップロードできませんでした');
		}
		const { data } = await supabase.storage
			.from('avaters')
			.getPublicUrl(filePath);
		const avatarUrl = data.publicUrl;
		console.log('avatarUrl', avatarUrl);

		return avatarUrl;
	};

	const serverBeforeImageDelete = async (avatarUrl: string) => {
		const beforeAvatarUrl = userState?.avatarUrl || '';
		if (!beforeAvatarUrl || !avatarUrl) return;

		const beforeAvaterPath = beforeAvatarUrl
			.split('/public/avaters/')
			.reverse()[0];
		const { error: databaseError } = await supabase.storage
			.from('avaters')
			.remove([beforeAvaterPath]);

		if (databaseError) {
			alert('更新前の画像が削除できませんでした');
			console.error('databaseError', databaseError);
			throw new Error('更新前の画像が削除できませんでした');
		}
	};

	const handleNicknameReset = (event: React.MouseEvent<HTMLButtonElement>) => {
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

		//アップロードした画像ファイルをSupabaseにアップロードしてURLを取得する
		const avatarUrl = (await serverImageUpload()) || '';
		console.log('avatarUrl', avatarUrl);
		console.log('userState', userState);

		await serverBeforeImageDelete(avatarUrl);

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
				avatarUrl: avatarUrl || '',
			};
			await updateProfileMutaion.mutate(newRow);

			if (avatarUrl) {
				setUserState((state) => ({
					...state,
					id: state?.id || '',
					avatarUrl: avatarUrl || state?.avatarUrl || '',
					nickname: profileNickname || state?.nickname || '',
					Profile_id: state?.Profile_id || '',
				}));
			}

			// プロフィール新規作成の場合
		} else {
			const userID = session.user.id;
			if (!userID) {
				throw new Error('ユーザーIDがありません');
			}
			const row = {
				nickname: profileNickname,
				avatarUrl: avatarUrl || '',
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
	}, [userState]);

	useEffect(() => {
		console.log('clientUploadObjectURL', clientUploadObjectURL);
		console.log('clientUploadFile', clientUploadFile);

		if (clientUploadObjectURL && clientUploadFile) {
			const size = clientUploadFile?.size || 0;
			const unitSize = fileSizeUnit(size);
			const maxSize = Number(process?.env?.NEXT_PUBLIC_UPLOAD_SIZE_LIMIT) || 0;

			if (size >= maxSize) {
				setPreviewFileStatus(
					`ファイルサイズ容量オーバー（${fileSizeUnit(maxSize)}上限）`
				);
				setProfileAvatarUrl(userState?.avatarUrl || imgAvaterDefault);
				setIsPreviewFileError(true);
			} else {
				setPreviewFileStatus(`${clientUploadFile.name} [${unitSize}]`);
				setProfileAvatarUrl(clientUploadObjectURL);
				setIsPreviewFileError(false);
			}
		} else {
			setProfileAvatarUrl(userState?.avatarUrl || imgAvaterDefault);
			setPreviewFileStatus('選択されてません');
			setIsPreviewFileError(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clientUploadObjectURL]);

	return (
		<div className="rounded-3xl bg-dark/50  px-[theme(spacing.xl)] py-[theme(spacing.content)]">
			<form
				className="grid gap-[theme(spacing.content)] "
				onSubmit={handleSubmit}
			>
				<div
					className="mx-auto flex w-[800px] max-w-full
					[&>*:first-child]:border-0 [&>*]:border-l-[1px]
					[&>*]:border-white/50"
				>
					<div className="grid flex-1 content-between justify-items-center gap-[theme(spacing.md)] px-[theme(spacing.default)]">
						<p className="text-xl tracking-wide">ニックネーム</p>
						<input
							className="h-[50px] w-[300px] max-w-full rounded-md border-[1px] border-solid border-white bg-white/5 px-[theme(spacing.xs)] text-white transition-colors duration-350 ease-in-out"
							name="nickname"
							type="text"
							value={profileNickname}
							placeholder="ニックネームを入力"
							autoComplete={'off'}
							required
							onChange={(event) => setProfileNickname(event.target.value)}
						/>
						<button
							className="text-white transition-colors duration-350 ease-in-out hover:text-primary"
							type="button"
							onClick={handleNicknameReset}
						>
							<span className="text-sm tracking-wide">キャンセル</span>
						</button>
					</div>
					<div className="grid flex-1 content-between justify-items-center gap-[theme(spacing.md)] px-[theme(spacing.default)]">
						<p className="text-xl tracking-wide">アイコン画像</p>
						<label
							className="group grid cursor-pointer gap-[theme(spacing.default)]"
							tabIndex={0}
						>
							{profileAvatarUrl && (
								<span
									className="flex h-[120px] w-[120px] cursor-pointer items-center justify-center rounded-full duration-350
									[&>img]:h-full [&>img]:w-full [&>img]:rounded-full [&>img]:object-cover"
								>
									<Image
										src={profileAvatarUrl}
										alt={clientUploadFileName}
										width={360}
										height={360}
									/>
								</span>
							)}
							<span
								className="hidden"
								ref={clientUploadtRef}
							/>
							<input
								className="hidden"
								name="avatarUrl"
								type="file"
								accept="image/*"
								onChange={handleClientUpload}
							/>
							<span
								role="button"
								className="grid h-[30px] w-full place-content-center place-items-center rounded-md border-[1px] border-solid border-primary bg-primary py-[10px] text-dark transition-all duration-350 ease-in-out
								hover:bg-dark hover:text-primary
								group-hover:bg-dark group-hover:text-primary
							"
							>
								<span className="block text-xs tracking-wide">
									ファイルを選択
								</span>
							</span>
						</label>
						<p
							className="text-sm tracking-wide
						data-[isError=true]:text-danger"
							data-isError={isPreviewFileError}
						>
							{previewFileStatus}
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
