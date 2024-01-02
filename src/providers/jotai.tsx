'use client';

import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';

type ProviderProps = {
	children: React.ReactNode;
};

export function JotaiProvider(props: ProviderProps) {
	return (
		<Provider>
			<DevTools />
			{props.children}
		</Provider>
	);
}
