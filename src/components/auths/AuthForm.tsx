'use client';

import { useState, FormEvent } from 'react';

import { useAuthMutate } from '@/hooks/useAuthMutate';
import { useProfileMutate } from '@/hooks/useProfileMutate';

type Props = {
	isLoginMode: boolean;
	setIsLoginMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AuthForm({ isLoginMode, setIsLoginMode }: Props) {
	const {
		authEmail,
		setAuthEmail,
		authPassword,
		setAuthPassword,
		loginAuthMutaion,
		registerAuthMutaion,
	} = useAuthMutate();
	const {
		profileNickname,
		setProfileNickname,
		profileAvatarUrl,
		setProfileAvatarUrl,
		createProfileMutaion,
		updateProfileMutaion,
		deleteProfileMutaion,
	} = useProfileMutate();
	const [image, setImage] = useState<File>();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		//TODO: アップロードした画像ファイルをSupabaseにアップロードしてURLを取得する
		if (image) {
			setProfileAvatarUrl('https://avatars.github/xxxxx.png');
		}
		if (isLoginMode) {
			await loginAuthMutaion.mutate();
		} else {
			await registerAuthMutaion.mutate();
			// await createProfileMutaion.mutate();
		}
	};
	return (
		<div className="">
			<form onSubmit={handleSubmit}>
				<div>
					<input
						className="text-dark"
						type="text"
						value={authEmail}
						placeholder="メールアドレスを入力してください"
						required
						onChange={(event) => setAuthEmail(event.target.value)}
					/>
				</div>
				<div>
					<input
						className="text-dark"
						type="password"
						value={authPassword}
						placeholder="パスワードを入力してください"
						required
						onChange={(event) => setAuthPassword(event.target.value)}
					/>
				</div>
				{!isLoginMode && (
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
				)}
				{!isLoginMode && (
					<div>
						<input
							className="text-dark"
							type="file"
							accept="image/*"
							onChange={(event) => {
								if (!event.target.files) return;
								const img: File = event.target.files[0];
								setImage(img);
							}}
						/>
					</div>
				)}
				<div className="">
					<button
						type="button"
						onClick={() => setIsLoginMode(!isLoginMode)}
						className="cursor-pointer"
					>
						{isLoginMode ? '新規登録はこちら' : 'ログインはこちら'}
					</button>
				</div>
				<button
					type="submit"
					className=""
				>
					<span className=""></span>
					{isLoginMode ? 'ログイン' : '登録'}
				</button>
			</form>
		</div>
	);
}
