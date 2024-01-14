import React from 'react';

type Props = {
	children: React.ReactNode;
};

export default function EditButtons({ children }: Props) {
	return (
		<div
			className="grid w-[60px] gap-[1px] rounded-md
			[&>*:first-child]:rounded-t-md
			[&>*:last-child]:rounded-b-md
		"
		>
			{children}
		</div>
	);
}
