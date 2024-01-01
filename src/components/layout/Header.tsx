import Link from 'next/link';

export default function Header() {
	return (
		<>
			<header className="sticky top-0 grid place-content-center place-items-center bg-dark/50">
				<p className="text-base uppercase tracking-wider">
					<Link href="/">Header</Link>
				</p>
			</header>
		</>
	);
}
