import React from 'react';

import Input from '@/components/forms/Input';
import TextButton from '@/components/buttons/TextButton';

type Props = {
	name?: string;
	type?: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function InputWithCancel({
	name = '',
	type = 'text',
	value,
	onChange,
	onClick,
}: Props) {
	return (
		<>
			<Input
				name={name}
				type={type}
				value={value}
				placeholder="ニックネームを入力"
				isAutoCompleteOff={true}
				isRequired={true}
				onChange={onChange}
			/>
			<TextButton
				label="キャンセル"
				onClick={onClick}
			/>
		</>
	);
}
