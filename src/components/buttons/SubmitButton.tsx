import React from 'react';

type Props = {
	label: string;
	isSubmit?: boolean;
	isDisabled?: boolean;
};

export default function SubmitButton({ label, isSubmit, isDisabled }: Props) {
	return (
		<button
			className="grid h-[60px] w-full place-items-center rounded-md border-[1px] border-solid border-primary bg-primary py-[10px] text-dark transition-colors duration-350 ease-in-out
			hover:bg-dark hover:text-primary
			disabled:cursor-not-allowed disabled:border-disabled_dark disabled:bg-disabled disabled:text-disabled_dark"
			type={isSubmit ? 'submit' : undefined}
			disabled={isDisabled}
		>
			<span className="block indent-[1em] text-2xl font-bold tracking-[1em]">
				{label}
			</span>
		</button>
	);
}
