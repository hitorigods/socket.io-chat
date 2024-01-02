'use client';

import { Suspense, useEffect } from 'react';

import Heading from '@/components/Heading';
import ConnectForm from '@/components/ConnectForm';

import supabase from '@/libs/supabase';
import { Database } from '@/libs/supabase.types';

export const fetchMessageDase = async () => {
	try {
		let { data: message, error } = await supabase
			.from('message')
			.select('title');
		return message;
	} catch (error) {
		console.error(error);
		return error;
	}
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
