'use client';

import React, { useState } from 'react';
import { FaGoogle, FaGithub, FaDiscord } from 'react-icons/fa6';

import FormArea from '@/components/forms/FormArea';
import FormSubmit from '@/components/forms/FormSubmit';
import InputSingle from '@/components/forms/InputSingle';
import FlexColumns from '@/components/columns/FlexColumns';
import FlexColumn from '@/components/columns/FlexColumn';
import TextButton from '@/components/buttons/TextButton';
import SnsButton from '@/components/buttons/SnsButton';
import { useAuthMutate } from '../useAuthMutate';
import { useAuthOauthSignIn } from '../useAuthOauthSignIn';

type Props = {
	isLoginMode: boolean;
	setIsLoginMode: React.Dispatch<React.SetStateAction<boolean>>;
};

type StateStatus = {
	type: 'update' | 'error';
	message: string | unknown;
}[];

export default function AuthForm({ isLoginMode, setIsLoginMode }: Props) {
	const {
		authEmail,
		setAuthEmail,
		authPassword,
		setAuthPassword,
		loginAuthMutaion,
		registerAuthMutaion,
	} = useAuthMutate();

	const { handleOAuthSignIn } = useAuthOauthSignIn();

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
					<InputSingle
						name="email"
						value={authEmail}
						placeholder="example@test.com"
						isRequired={true}
						onChange={(event) => setAuthEmail(event.target.value)}
					/>
				</FlexColumn>
				<FlexColumn title="パスワード">
					<InputSingle
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
			</div>
			<FlexColumns>
				<FlexColumn title="Google">
					<SnsButton
						type="google"
						label="Google"
						onClick={(event) => {
							handleOAuthSignIn(event, { provider: 'google' });
						}}
					/>
				</FlexColumn>
				<FlexColumn title="GitHub">
					<SnsButton
						type="github"
						label="GitHub"
						onClick={(event) => {
							handleOAuthSignIn(event, { provider: 'github' });
						}}
					/>
				</FlexColumn>
				<FlexColumn title="Discord">
					<SnsButton
						type="discord"
						label="Discord"
						onClick={(event) => {
							handleOAuthSignIn(event, { provider: 'discord' });
						}}
					/>
				</FlexColumn>
			</FlexColumns>
			<FormSubmit
				buttonLabel={isLoginMode ? '入室' : '登録'}
				isDisabled={!authEmail && !authPassword}
			/>
		</FormArea>
	);
}
