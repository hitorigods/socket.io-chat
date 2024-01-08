import React from 'react';

type Props = {
	children: React.ReactNode;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function FormArea({ children, onSubmit }: Props) {
	return (
		<>
			<div className="rounded-3xl bg-dark/50  px-[theme(spacing.xl)] py-[theme(spacing.content)]">
				<form
					className="grid gap-[theme(spacing.content)] "
					onSubmit={onSubmit}
				>
					{children}
				</form>
			</div>
		</>
	);
}
