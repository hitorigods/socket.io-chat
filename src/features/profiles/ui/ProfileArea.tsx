'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAtom } from 'jotai';

import { userAtom } from '@/features/users/userAtom';
import { usePreviewUploadImage } from '@/utils/hooks/usePreviewUploadImage';
import { useFileSizeUnit } from '@/utils/hooks/useFileSizeUnit';
import FormArea from '@/components/forms/FormArea';
import FormSubmit from '@/components/forms/FormSubmit';
import FlexColumns from '@/components/columns/FlexColumns';
import FlexColumn from '@/components/columns/FlexColumn';
import InputWithCancel from '@/components/forms/InputWithCancel';
import InputPreviewFile from '@/components/forms/InputPreviewFile';
import { useProfileMutate } from '../useProfileMutate';
import { useProfileSubmit } from '../useProfileSubmit';

import imgAvaterDefault from '@/assets/icons/avater.svg';

export default function ProfileArea() {
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

	const { handleSubmit } = useProfileSubmit({
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
		<FormArea onSubmit={handleSubmit}>
			<FlexColumns>
				<FlexColumn title="ニックネーム">
					<InputWithCancel
						name="nickname"
						type="text"
						value={profileNickname}
						onChange={(event) => setProfileNickname(event.target.value)}
						onClick={handleNicknameReset}
					/>
				</FlexColumn>
				<FlexColumn title="アイコン画像">
					<InputPreviewFile
						imageUrl={profileAvatarUrl}
						fileName={clientUploadFileName}
						status={previewFileStatus}
						fileRef={clientUploadRef}
						isError={isPreviewFileError}
						onChange={handleClientUpload}
					/>
				</FlexColumn>
			</FlexColumns>
			<FormSubmit
				buttonLabel={userState && userState.nickname ? '更新' : '登録'}
				isDisabled={!profileNickname}
			/>
		</FormArea>
	);
}
