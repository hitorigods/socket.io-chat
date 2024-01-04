import React, { MouseEventHandler } from 'react';

type Props = {
	label: string;
	type?: 'default' | 'danger';
	onClick: MouseEventHandler<HTMLButtonElement>;
};
export default function EditButton({
	label,
	type = 'default',
	onClick,
}: Props) {
	return (
		<button
			className="grid bg-dark py-[10px] text-white
			data-[type=danger]:bg-danger"
			data-type={type}
			onClick={onClick}
		>
			<span className="block indent-[.5em] text-xs font-bold tracking-[.5em]">
				{label}
			</span>
		</button>
	);
}
