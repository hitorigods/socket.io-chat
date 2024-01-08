'use client';

import React from 'react';

import FormArea from '@/components/forms/FormArea';
import FormSubmit from '@/components/forms/FormSubmit';
import Input from '@/components/forms/Input';
import FlexColumns from '@/components/columns/FlexColumns';
import FlexColumn from '@/components/columns/FlexColumn';
import TextButton from '@/components/buttons/TextButton';
import { useAuthMutate } from '../useAuthMutate';

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

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isLoginMode) {
			await loginAuthMutaion.mutate();
		} else {
			await registerAuthMutaion.mutate();
		}
	};

	return (
		<FormArea onSubmit={handleSubmit}>
			<FlexColumns>
				<FlexColumn title="メールアドレス">
					<Input
						name="email"
						value={authEmail}
						placeholder="example@test.com"
						isRequired={true}
						onChange={(event) => setAuthEmail(event.target.value)}
					/>
				</FlexColumn>
				<FlexColumn title="パスワード">
					<Input
						name="password"
						type="password"
						value={authPassword}
						placeholder="your password"
						isRequired={true}
						onChange={(event) => setAuthPassword(event.target.value)}
					/>
				</FlexColumn>
			</FlexColumns>
			<div className="flex justify-center">
				<TextButton
					label={isLoginMode ? '新規登録はこちら' : 'サインインはこちら'}
					type="button"
					onClick={() => setIsLoginMode(!isLoginMode)}
				/>
				<TextButton
					label="パスワードを忘れた方はこちら"
					type="button"
					onClick={(event) => {
						event.preventDefault();
						alert('パスワードを忘れた方はこちら');
					}}
				/>
			</div>
			<FormSubmit
				buttonLabel={isLoginMode ? '入室' : '登録'}
				isDisabled={!authEmail && !authPassword}
			/>
		</FormArea>
	);
}
