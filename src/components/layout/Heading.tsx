type Props = {
	label: string;
	caption?: string;
};

export default function Heading({ label, caption }: Props) {
	return (
		<div className="grid place-items-center gap-[theme(spacing.md)]">
			<div className="font-heading text-7xl uppercase tracking-wider">
				{label}
			</div>
			<h1 className="text-xl font-bold tracking-wider">{caption}</h1>
		</div>
	);
}
