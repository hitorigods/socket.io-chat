'use client';

import React from 'react';
import { useState } from 'react';

import Heading from '@/components/Heading';
import AuthForm from '@/components/auths/AuthForm';

export default function PageContent() {
	const [isLoginMode, setIsLoginMode] = useState(true);

	return (
		<div className="">
			<Heading title={isLoginMode ? 'ログイン' : '新規登録'} />
			<AuthForm
				isLoginMode={isLoginMode}
				setIsLoginMode={setIsLoginMode}
			/>
		</div>
	);
}
