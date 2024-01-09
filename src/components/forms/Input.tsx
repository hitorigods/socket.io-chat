import React from 'react';

type Props = {
	name: string;
	value: string;
	type?: string;
	placeholder?: string;
	isRequired?: boolean;
	isAutoCompleteOff?: boolean;
	isDisabled?: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
	name = '',
	value = '',
	type = 'text',
	placeholder = '',
	isRequired,
	isDisabled,
	isAutoCompleteOff,
	onChange,
}: Props) {
	return (
		<>
			<input
				className="h-[50px] w-[300px] max-w-full rounded-md border-[1px] border-solid border-white bg-white/5 px-[theme(spacing.sm)] text-white transition-colors duration-350 ease-in-out"
				name={name}
				type={type}
				value={value}
				placeholder={placeholder}
				required={isRequired}
				disabled={isDisabled}
				autoComplete={isAutoCompleteOff ? 'off' : undefined}
				onChange={onChange}
			/>
		</>
	);
}
