import React from 'react';

import SubmitButton from '@/components/buttons/SubmitButton';

type Props = {
	buttonLabel: string;
	isDisabled?: boolean;
};

export default function FormSubmit({ buttonLabel, isDisabled }: Props) {
	return (
		<div className="grid justify-center">
			<div className="w-[350px] max-w-full">
				<SubmitButton
					label={buttonLabel}
					isTypeButton={false}
					isDisabled={isDisabled}
				/>
			</div>
		</div>
	);
}
