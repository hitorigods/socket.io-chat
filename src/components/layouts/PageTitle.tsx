type Props = {
	label: string;
	caption?: string;
};

export default function PageTitle({ label, caption }: Props) {
	return (
		<div className="grid h-[100px] content-between justify-center justify-items-center gap-[theme(spacing.sm)]">
			<div className="mt-[-.2em] font-heading text-7xl/none uppercase tracking-wider">
				{label}
			</div>
			<h1 className="text-xl font-bold tracking-wider">{caption}</h1>
		</div>
	);
}
