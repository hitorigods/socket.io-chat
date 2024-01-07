import React from 'react';

type Props = {
	label: string;
	isSubmit?: boolean;
	isDisabled?: boolean;
};

export default function SubmitButton({ label, isSubmit, isDisabled }: Props) {
	return (
		<button
			className="grid h-[60px] w-full place-items-center rounded-md bg-primary py-[10px] text-dark transition-all duration-300 ease-in-out
			hover:bg-dark hover:text-white
			disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled_dark"
			type={isSubmit ? 'submit' : undefined}
			disabled={isDisabled}
		>
			<span className="block indent-[1em] text-2xl font-bold tracking-[1em]">
				{label}
			</span>
		</button>
	);
}
