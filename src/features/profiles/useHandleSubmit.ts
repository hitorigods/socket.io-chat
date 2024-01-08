import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import supabase from '@/utils/libs/supabase';
import { userAtom } from '@/features/users/userAtom';
import { useServerUploadImage } from '@/utils/hooks/useServerUploadImage';
import { useServerDeleteImage } from '@/utils/hooks/useServerDeleteImage';
import { RowProfile } from './profileSchemas';
import { useProfileMutate } from './useProfileMutate';

type Props = {
	isPreviewFileError: boolean;
	clientUploadFile: File | null;
	profileNickname: string;
	createProfileMutaion: ReturnType<
		typeof useProfileMutate
	>['createProfileMutaion'];
	updateProfileMutaion: ReturnType<
		typeof useProfileMutate
	>['updateProfileMutaion'];
};

export function useHandleSubmit({
	isPreviewFileError,
	clientUploadFile,
	profileNickname,
	createProfileMutaion,
	updateProfileMutaion,
}: Props) {
	const router = useRouter();
	const [userState, setUserState] = useAtom(userAtom);

	const { serverImageUpload } = useServerUploadImage();
	const { serverImageDelete } = useServerDeleteImage();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const {
			data: { session },
		} = await supabase.auth.getSession();
		if (!session) {
			throw new Error('サインインしてください');
		}

		/** アップロードした画像ファイルをSupabaseにアップロードしてURLを取得する */
		const afterAvatarUrl =
			(await serverImageUpload({
				bucketName: 'Avaters',
				uploadFile: clientUploadFile,
				isError: isPreviewFileError,
			})) || '';

		/** 新しい画像が登録されたときは古い画像を削除する */
		if (afterAvatarUrl) {
			const beforeAvatarUrl = userState?.avatarUrl || '';
			await serverImageDelete({
				bucketName: 'Avaters',
				deleteUrl: beforeAvatarUrl,
			});
		}

		/** プロフィール作成済みの場合の処理 */
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
				avatarUrl: afterAvatarUrl || '',
			};
			await updateProfileMutaion.mutate(newRow);

			if (afterAvatarUrl) {
				setUserState((state) => ({
					...state,
					id: state?.id || '',
					avatarUrl: afterAvatarUrl || state?.avatarUrl || '',
					nickname: profileNickname || state?.nickname || '',
					Profile_id: state?.Profile_id || '',
				}));
			}

			/** プロフィール新規作成の場合の処理 */
		} else {
			const userID = session.user.id;
			if (!userID) {
				throw new Error('ユーザーIDがありません');
			}
			const row = {
				nickname: profileNickname,
				avatarUrl: afterAvatarUrl || '',
				User_id: userID,
			};
			console.log('row', row);

			await createProfileMutaion.mutate(row);
			await router.push('/');
		}
	};
	return { handleSubmit };
}
