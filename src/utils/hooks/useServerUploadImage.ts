import supabase from '@/utils/libs/supabase';
import { useAtom } from 'jotai';

import { userAtom } from '@/features/users/userAtom';

export const useServerUploadImage = () => {
	const [userState] = useAtom(userAtom);

	const serverImageUpload = async ({
		bucketName,
		uploadFile,
		isError,
	}: {
		bucketName: string;
		uploadFile: File | null;
		isError: boolean;
	}) => {
		if (!uploadFile || !uploadFile.name || !userState?.id || isError) return;
		const [ext, ...fileName] = uploadFile.name.split('.').reverse();
		const filePath = `${userState.id}/${Date.now()}.${ext}`;

		const { error } = await supabase.storage
			.from(bucketName)
			.upload(filePath, uploadFile);
		if (error) {
			alert('画像がアップロードできませんでした');
			console.error('error', error);
			throw new Error('画像がアップロードできませんでした');
		}
		const { data } = await supabase.storage
			.from(bucketName)
			.getPublicUrl(filePath);
		const getImageUrl = data.publicUrl;

		return getImageUrl;
	};
	return { serverImageUpload };
};
