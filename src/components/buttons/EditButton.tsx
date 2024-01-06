import React from 'react';

type Props = {
	label: string;
	type?: 'default' | 'danger';
	onClick: React.MouseEventHandler<HTMLButtonElement>;
};
export default function EditButton({
	label,
	type = 'default',
	onClick,
}: Props) {
	return (
		<button
			className="grid bg-dark py-[10px] text-white transition-all duration-300 ease-in-out
				hover:bg-primary
				hover:text-dark data-[type=danger]:bg-danger
				data-[type=danger]:hover:bg-primary data-[type=danger]:hover:text-dark
			"
			data-type={type}
			onClick={onClick}
		>
			<span className="block indent-[.5em] text-xs font-bold tracking-[.5em]">
				{label}
			</span>
		</button>
	);
}
