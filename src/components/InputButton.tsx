import { useRef, useEffect } from 'react';

type Props = {
	label: string;
	name: string;
	placeholder?: string;
	value: string;
	disabled?: boolean;
	isEdited?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputButton({
	label,
	name,
	placeholder,
	value,
	disabled,
	isEdited,
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
			className={`flex w-[500px] overflow-hidden rounded bg-white shadow-md outline outline-4 outline-transparent transition-[outline] duration-300 ease-in-out
			has-[input:focus+button:data-[is-edited=true]]:outline-secondary
			has-[input:focus]:outline-primary`}
		>
			<input
				className="flex-1 bg-transparent p-3 tracking-widest text-dark outline-0
				ring-0 transition-colors duration-300 ease-in-out
				focus:bg-primary/0"
				name={name}
				value={value}
				placeholder={placeholder}
				autoComplete={'off'}
				ref={inputRef}
				onChange={onChange}
			/>
			<button
				className="w-[100px] bg-primary py-3 indent-[.5em] text-lg font-bold tracking-[.5em] text-white transition-colors duration-300 ease-in-out
				hover:bg-secondary
				disabled:cursor-not-allowed disabled:bg-disabled
				data-[is-edited=true]:bg-secondary
			  data-[is-edited=true]:hover:bg-primary
				data-[is-edited=true]:disabled:bg-disabled"
				disabled={disabled}
				data-is-edited={isEdited}
			>
				{label}
			</button>
		</label>
	);
}
