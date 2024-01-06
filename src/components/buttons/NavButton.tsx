import React from 'react';

type Props = {
	label: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function NavButton({ label, onClick }: Props) {
	return (
		<button
			className="grid min-h-[40px] w-full place-content-center place-items-center rounded border p-[5px_10px]"
			onClick={onClick}
		>
			<span className="text-xs tracking-wide">{label}</span>
		</button>
	);
}
