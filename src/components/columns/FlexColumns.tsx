import React from 'react';

type Props = {
	children: React.ReactNode;
};

export default function FlexColumns({ children }: Props) {
	return (
		<div
			className="mx-auto flex w-[800px] max-w-full
			[&>*:first-child]:border-0 [&>*]:border-l-[1px]
			[&>*]:border-white/50"
		>
			{children}
		</div>
	);
}
