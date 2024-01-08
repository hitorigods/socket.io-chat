import React from 'react';

type Props = {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	handleReset: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function ProfileInputNickname({
	value,
	setValue,
	handleReset,
}: Props) {
	return (
		<>
			<input
				className="h-[50px] w-[300px] max-w-full rounded-md border-[1px] border-solid border-white bg-white/5 px-[theme(spacing.xs)] text-white transition-colors duration-350 ease-in-out"
				name="nickname"
				type="text"
				value={value}
				placeholder="ニックネームを入力"
				autoComplete={'off'}
				required
				onChange={(event) => setValue(event.target.value)}
			/>
			<button
				className="text-white transition-colors duration-350 ease-in-out hover:text-primary"
				type="button"
				onClick={handleReset}
			>
				<span className="text-sm tracking-wide">キャンセル</span>
			</button>
		</>
	);
}
