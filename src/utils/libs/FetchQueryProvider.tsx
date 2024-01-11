'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
	children: React.ReactNode;
};

export function FetchQueryProvider(props: Props) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				refetchOnWindowFocus: false,
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
