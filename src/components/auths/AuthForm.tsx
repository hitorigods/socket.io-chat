'use client';

import { useState, FormEvent } from 'react';

import { useMutateAuth } from '@/hooks/useAuthMutate';

export default function AuthForm() {
	const {
		authEmail,
		setAuthEmail,
		authPassword,
		setAuthPassword,
		loginAuthMutaion,
		registerAuthMutaion,
	} = useMutateAuth();

	const [isLoginMode, setIsLoginMode] = useState(true);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isLoginMode) {
			loginAuthMutaion.mutate();
		} else {
			registerAuthMutaion.mutate();
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<input
					type="text"
					required
					className="text-dark"
					placeholder="メールアドレスを入力してください"
					value={authEmail}
					onChange={(event) => setAuthEmail(event.target.value)}
				/>
			</div>
			<div>
				<input
					type="password"
					required
					className="text-dark"
					placeholder="パスワードを入力してください"
					value={authPassword}
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
				<span className=""></span>
				{isLoginMode ? 'ログイン' : '登録'}
			</button>
		</form>
	);
}
