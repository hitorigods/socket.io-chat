import React from 'react';

type Props = {
	label: string;
	type?: 'reset' | 'button' | 'submit' | undefined;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function TextButton({ label, type = 'button', onClick }: Props) {
	return (
		<button
			className="text-white transition-colors duration-350 ease-in-out hover:text-primary"
			type={type}
			onClick={onClick}
		>
			<span className="text-sm tracking-wide">{label}</span>
		</button>
	);
}
