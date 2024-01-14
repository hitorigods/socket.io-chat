import React from 'react';
import Image from 'next/image';

type Props = {
	imageUrl: string;
	fileName: string;
	status: string;
	isError: boolean;
	fileRef: React.RefObject<HTMLElement>;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputPreviewFile({
	imageUrl,
	fileName,
	status,
	isError,
	fileRef,
	onChange,
}: Props) {
	return (
		<>
			<label
				className="group grid cursor-pointer gap-[theme(spacing.default)]"
				tabIndex={0}
			>
				{imageUrl && (
					<span
						className="flex h-[120px] w-[120px] cursor-pointer items-center justify-center rounded-full duration-350
						[&>img]:h-full [&>img]:w-full [&>img]:rounded-full [&>img]:object-cover"
					>
						<img
							src={imageUrl}
							alt={fileName}
							width="360"
							height="360"
						/>
						{/* Renderでメモリ不足になるのでImageコンポーネントは使わない
						<Image
							src={imageUrl}
							alt={fileName}
							width={360}
							height={360}
						/>
						*/}
					</span>
				)}
				<span
					className="hidden"
					ref={fileRef}
				/>
				<input
					className="hidden"
					name="imageUrl"
					type="file"
					accept="image/*"
					onChange={onChange}
				/>
				<span
					role="button"
					className="grid h-[30px] w-full place-content-center place-items-center rounded-md border-[1px] border-solid border-primary bg-primary py-[10px] text-dark transition-all duration-350 ease-in-out
				hover:bg-dark hover:text-primary
				group-hover:bg-dark group-hover:text-primary"
				>
					<span className="block text-xs tracking-wide">ファイルを選択</span>
				</span>
			</label>
			<p
				className="text-sm tracking-wide
				data-[is-error=true]:text-danger"
				data-is-error={isError}
			>
				{status}
			</p>
		</>
	);
}
