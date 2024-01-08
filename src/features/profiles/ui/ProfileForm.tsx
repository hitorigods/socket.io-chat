'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAtom } from 'jotai';

import { userAtom } from '@/features/users/userAtom';
import { usePreviewUploadImage } from '@/utils/hooks/usePreviewUploadImage';
import { useFileSizeUnit } from '@/utils/helpers/fileSizeUnit';
import SubmitButton from '@/components/buttons/SubmitButton';
import { useProfileMutate } from '../useProfileMutate';
import { useHandleSubmit } from '../useHandleSubmit';
import ProfileCard from './ProfileCard';
import ProfileInputNickname from './ProfileInputNickname';
import ProfileInputAvater from './ProfileInputAvater';

import imgAvaterDefault from '@/assets/icons/avater.svg';

export default function ProfileFrom() {
	const [previewFileStatus, setPreviewFileStatus] = useState('');
	const [isPreviewFileError, setIsPreviewFileError] = useState(false);
	const [userState] = useAtom(userAtom);
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
		clientUploadRef,
		clientUploadObjectURL,
		clientUploadFile,
		clientUploadFileName,
	} = usePreviewUploadImage();

	const { fileSizeUnit } = useFileSizeUnit();

	const { handleSubmit } = useHandleSubmit({
		isPreviewFileError,
		clientUploadFile,
		profileNickname,
		createProfileMutaion,
		updateProfileMutaion,
	});

	const handleNicknameReset = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setProfileNickname(userState?.nickname || '');
	};

	useEffect(() => {
		setProfileNickname(userState?.nickname || '');
		setProfileAvatarUrl(userState?.avatarUrl || imgAvaterDefault);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userState]);

	useEffect(() => {
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
					<ProfileCard title="ニックネーム">
						<ProfileInputNickname
							value={profileNickname}
							setValue={setProfileNickname}
							handleReset={handleNicknameReset}
						/>
					</ProfileCard>
					<ProfileCard title="アイコン画像">
						<ProfileInputAvater
							imageUrl={profileAvatarUrl}
							fileName={clientUploadFileName}
							status={previewFileStatus}
							fileRef={clientUploadRef}
							isError={isPreviewFileError}
							handleChange={handleClientUpload}
						/>
					</ProfileCard>
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
