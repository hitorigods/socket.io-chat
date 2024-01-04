'use client';

import { FormEvent } from 'react';

import { useAuthMutate } from '@/hooks/useAuthMutate';

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

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isLoginMode) {
			await loginAuthMutaion.mutate();
		} else {
			await registerAuthMutaion.mutate();
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
					<span className=""> {isLoginMode ? 'ログイン' : '登録'}</span>
				</button>
			</form>
		</div>
	);
}
