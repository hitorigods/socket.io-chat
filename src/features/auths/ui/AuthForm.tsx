'use client';

import React, { useEffect, useState } from 'react';

import supabase from '@/utils/libs/supabase';
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

type StateStatus = {
	type: 'update' | 'error';
	message: string | unknown;
}[];

export default function AuthForm({ isLoginMode, setIsLoginMode }: Props) {
	const [stateStatus, setStateStatus] = useState<StateStatus>([]);
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

	const handleOAuthSignIn = async (
		event: React.MouseEvent<HTMLButtonElement>,
		{ provider }: { provider: 'google' | 'github' | 'discord' }
	) => {
		event.preventDefault();

		const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);

		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: provider,
			});
			if (error) {
				setStateStatus((state) => [
					...state,
					{ type: 'error', message: error?.message },
				]);
			}
		} catch (error) {
			if (error instanceof Error) {
				setStateStatus((state) => [
					...state,
					// @ts-ignore
					{ type: 'error', message: error.message },
				]);
			} else {
				setStateStatus((state) => [
					...state,
					{ type: 'error', message: `${providerName}との連携に失敗しました。` },
				]);
			}
		}
		setStateStatus((state) => [
			...state,
			{ type: 'update', message: `${providerName}との連携に成功しました！` },
		]);
	};

	useEffect(() => {
		console.log('stateStatus', stateStatus);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stateStatus]);

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
			</div>
			<FlexColumns>
				<FlexColumn title="Google">
					<div>
						<button
							onClick={(event) => {
								handleOAuthSignIn(event, { provider: 'google' });
							}}
						>
							<span>Google</span>
						</button>
					</div>
				</FlexColumn>
				<FlexColumn title="GitHub">
					<div>
						<button
							onClick={(event) => {
								handleOAuthSignIn(event, { provider: 'github' });
							}}
						>
							<span>GitHub</span>
						</button>
					</div>
				</FlexColumn>
				<FlexColumn title="Discord">
					<div>
						<button
							onClick={(event) => {
								handleOAuthSignIn(event, { provider: 'discord' });
							}}
						>
							<span>Discord</span>
						</button>
					</div>
				</FlexColumn>
			</FlexColumns>
			<FormSubmit
				buttonLabel={isLoginMode ? '入室' : '登録'}
				isDisabled={!authEmail && !authPassword}
			/>
		</FormArea>
	);
}
