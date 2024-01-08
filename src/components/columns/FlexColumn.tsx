import React from 'react';

type Props = {
	children: React.ReactNode;
	title: string;
};

export default function FlexColumn({ children, title }: Props) {
	return (
		<div className="grid flex-1 content-between justify-items-center gap-[theme(spacing.md)] px-[theme(spacing.default)]">
			<p className="text-xl tracking-wide">{title}</p>
			{children}
		</div>
	);
}
