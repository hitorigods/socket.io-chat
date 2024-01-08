'use client';

import React from 'react';
import { useState } from 'react';

import PageTitle from '@/components/layouts/PageTitle';
import AuthForm from '@/features/auths/ui/AuthForm';

export default function PageContent() {
	const [isLoginMode, setIsLoginMode] = useState(true);

	return (
		<>
			<PageTitle
				label={isLoginMode ? 'Sign in' : 'Sign up'}
				caption={isLoginMode ? 'サインイン' : '新規登録'}
			/>
			<AuthForm
				isLoginMode={isLoginMode}
				setIsLoginMode={setIsLoginMode}
			/>
		</>
	);
}
