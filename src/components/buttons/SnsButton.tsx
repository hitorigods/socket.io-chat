import React from 'react';
import { FaGoogle, FaGithub, FaDiscord } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

type Props = {
	type: 'google' | 'github' | 'discord';
	label: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function SnsButton({ type, label, onClick }: Props) {
	return (
		<button
			className="group grid h-[50px] w-full place-items-center rounded border-[1px] border-solid border-white bg-white/5 px-[theme(spacing.sm)] transition-colors duration-350 ease-in-out
			hover:border-primary hover:bg-primary hover:text-dark"
			onClick={onClick}
		>
			<span className="relative flex w-full items-center justify-between gap-[10px]">
				<span
					className={`grid place-items-center rounded-full
					[&>svg]:h-[30px] [&>svg]:w-[30px] [&>svg]:max-w-full
					${type === 'google' && 'bg-white text-white'}
					${type === 'github' && 'bg-transparent text-white'}
					${
						type === 'discord' &&
						'h-[30px] w-[30px] bg-[#5865F2] text-white [&>svg]:w-[20px]'
					}
				`}
				>
					{type === 'google' && <FcGoogle />}
					{type === 'github' && <FaGithub />}
					{type === 'discord' && <FaDiscord />}
				</span>
				<span className="text-base font-medium tracking-wide">{label}</span>
				<span className="grid h-[30px] w-[30px] items-center justify-end">
					{/* <span
						className="block translate-x-[50%] border-x-[7.5px] border-y-[5px] border-solid border-transparent !border-l-white
					group-hover:!border-l-dark"
					></span> */}
				</span>
			</span>
		</button>
	);
}
