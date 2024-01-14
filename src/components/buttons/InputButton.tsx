import { useRef, useEffect } from 'react';

type Props = {
	label: string;
	name: string;
	placeholder?: string;
	value: string;
	disabled?: boolean;
	isReverse?: boolean;
	ref?: React.RefObject<HTMLInputElement>;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputButton({
	label,
	name,
	placeholder,
	value,
	disabled,
	isReverse,
	onChange,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef?.current?.focus();
	}, [value]);

	return (
		<label className={`relative flex w-full min-w-[500px] max-w-full`}>
			<input
				className="h-[55px] flex-1 rounded-md border-[1px] border-solid border-white  bg-white/5 pl-[theme(spacing.sm)] pr-[calc(100px_+_theme(spacing.sm))] tracking-widest text-white transition-colors duration-350 ease-in-out"
				name={name}
				value={value}
				placeholder={placeholder}
				autoComplete={'off'}
				ref={inputRef}
				onChange={onChange}
			/>
			<button
				className="absolute inset-y-0 right-0 w-[100px]  rounded-r border-[1px] border-solid border-primary bg-primary py-[theme(spacing.xs)] indent-[.5em] text-lg font-bold tracking-[.5em] text-dark transition-colors duration-350 ease-in-out
					hover:bg-dark hover:text-primary
					disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:text-disabled_dark data-[is-reverse=true]:bg-dark
					data-[is-reverse=true]:text-primary data-[is-reverse=true]:hover:bg-primary
					data-[is-reverse=true]:hover:text-dark data-[is-reverse=true]:disabled:bg-disabled
					data-[is-reverse=true]:disabled:text-disabled_dark"
				disabled={disabled}
				data-is-reverse={isReverse}
			>
				{label}
			</button>
		</label>
	);
}
