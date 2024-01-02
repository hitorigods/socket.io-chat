'use client';

import { Suspense, useEffect } from 'react';

import Heading from '@/components/Heading';
import ConnectForm from '@/components/ConnectForm';

import supabase from '@/libs/supabase';
import { Database } from '@/libs/supabase.types';

export const fetchMessageDase = async () => {
	const { data: message, error } = await supabase
		.from('message')
		.select('title');

	if (error) {
		throw new Error(error.message);
	}

	return message;
};

export default function Home() {
	useEffect(() => {
		(async () => {
			const allMessage = await fetchMessageDase();
			console.log('allMessage', allMessage);
		})();
	}, []);

	return (
		<Suspense fallback="loading...">
			<Heading title="Top" />
			<ConnectForm />
		</Suspense>
	);
}
