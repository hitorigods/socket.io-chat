type Props = {
	label: string;
	name: string;
	placeholder?: string;
	value: string;
	disabled?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputButton({
	label,
	name,
	placeholder,
	value,
	disabled,
	onChange,
}: Props) {
	return (
		<label className="flex w-[400px] overflow-hidden rounded bg-white">
			<input
				className="flex-1 bg-transparent p-3 tracking-widest text-dark focus:outline-none"
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				autoComplete={'off'}
			/>
			<button
				className="w-[75px] bg-primary px-4 py-3 text-lg font-bold tracking-widest text-white transition-all duration-300 ease-in-out hover:bg-secondary disabled:cursor-not-allowed disabled:bg-disabled"
				disabled={disabled}
			>
				{label}
			</button>
		</label>
	);
}
