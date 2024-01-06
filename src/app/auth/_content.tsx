'use client';

import React from 'react';
import { useState } from 'react';

import Heading from '@/components/layout/Heading';
import AuthForm from '@/features/auths/ui/AuthForm';

export default function PageContent() {
	const [isLoginMode, setIsLoginMode] = useState(true);

	return (
		<div className="">
			<Heading
				label={isLoginMode ? 'Sign in' : 'Sign up'}
				caption={isLoginMode ? 'サインイン' : '新規登録'}
			/>
			<AuthForm
				isLoginMode={isLoginMode}
				setIsLoginMode={setIsLoginMode}
			/>
		</div>
	);
}
