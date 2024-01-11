import supabase from '@/utils/libs/supabase';

export const useServerDeleteImage = () => {
	const serverImageDelete = async ({
		bucketName,
		deleteUrl,
	}: {
		bucketName: string;
		deleteUrl: string;
	}) => {
		if (!deleteUrl) return;

		const beforeDeletePath = deleteUrl
			.split(`/public/${bucketName}/`)
			.reverse()[0];

		const { error } = await supabase.storage
			.from(bucketName)
			.remove([beforeDeletePath]);

		if (error) {
			alert('更新前の画像が削除できませんでした');
			console.error('error', error);
			throw new Error('更新前の画像が削除できませんでした');
		}
	};
	return { serverImageDelete };
};
