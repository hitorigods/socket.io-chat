'use client';

import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';

type JotaiProviderProps = {
	children: React.ReactNode;
};

export function JotaiProvider(props: JotaiProviderProps) {
	return (
		<Provider>
			<DevTools />
			{props.children}
		</Provider>
	);
}
