import React from 'react';

type Props = {
	label: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function NavButton({ label, onClick }: Props) {
	return (
		<button
			className="grid min-h-[40px] w-full place-content-center place-items-center rounded border bg-white/5 p-[5px_10px] transition-colors duration-350 ease-in-out
				hover:border-primary hover:bg-primary hover:text-dark
			"
			onClick={onClick}
		>
			<span className="text-xs tracking-wide">{label}</span>
		</button>
	);
}
