import { useRef, useEffect } from 'react';

type Props = {
	label: string;
	name: string;
	placeholder?: string;
	value: string;
	disabled?: boolean;
	isReverse?: boolean;
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
		if (value) {
			inputRef?.current?.focus();
		}
	}, [value]);
	return (
		<label
			className={`flex w-[500px] overflow-hidden rounded bg-white shadow-md outline outline-4 outline-transparent transition-[outline] duration-350 ease-in-out
				has-[input:focus+button:data-[is-reverse=true]]:outline-secondary
				has-[input:focus]:outline-primary
			`}
		>
			<input
				className="flex-1 bg-transparent p-3 tracking-widest text-dark outline-0 ring-0 transition-colors duration-350 ease-in-out
					focus:bg-primary/0
					focus-visible:border-0
				"
				name={name}
				value={value}
				placeholder={placeholder}
				autoComplete={'off'}
				ref={inputRef}
				onChange={onChange}
			/>
			<button
				className="w-[100px] bg-primary py-3 indent-[.5em] text-lg font-bold tracking-[.5em] text-dark outline-transparent transition-colors duration-350 ease-in-out
					hover:bg-dark hover:text-white
					focus-visible:border-0
					disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled_dark
					data-[is-reverse=true]:bg-dark data-[is-reverse=true]:text-white
					data-[is-reverse=true]:hover:bg-primary data-[is-reverse=true]:hover:text-dark
					data-[is-reverse=true]:disabled:bg-disabled data-[is-reverse=true]:disabled:text-disabled_dark
				"
				disabled={disabled}
				data-is-reverse={isReverse}
			>
				{label}
			</button>
		</label>
	);
}
