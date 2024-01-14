import React from 'react';

type Props = {
	children: React.ReactNode;
	layoutType?: 'default' | 'narrow';
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function FormArea({
	children,
	layoutType = 'default',
	onSubmit,
}: Props) {
	return (
		<>
			<section
				className={`rounded-3xl bg-dark/50
				${
					layoutType === 'narrow'
						? 'p-[theme(spacing.lg)]'
						: 'px-[theme(spacing.xl)] py-[theme(spacing.content)]'
				}`}
			>
				<form
					className="grid gap-[theme(spacing.content)] "
					onSubmit={onSubmit}
				>
					{children}
				</form>
			</section>
		</>
	);
}
