'use client';

import React, { useRef, useState, useEffect } from 'react';

export const useUploadImage = () => {
	const uplpadImageRef = useRef<HTMLElement>(null);
	const [objectURL, setObjectURL] = useState('');
	const [fileImage, setFileImage] = useState<HTMLImageElement | null>(null);

	useEffect(() => {
		const img = new Image();
		setFileImage(img);
	}, []);

	const resetSelection = () => {
		if (fileImage) fileImage.src = '';

		const imageContainer = uplpadImageRef.current;
		if (imageContainer && fileImage?.parentNode === imageContainer) {
			imageContainer.removeChild(fileImage);
		}

		if (objectURL) {
			window.URL.revokeObjectURL(objectURL);
			setObjectURL('');
		}
	};

	const handleUploadImage: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		resetSelection();

		const files = event.currentTarget.files;
		if (!files || files?.length === 0) return;

		const file = files[0];
		if (!file.type.includes('image/')) {
			event.currentTarget.value = '';
			return;
		}

		const imageContainer = uplpadImageRef.current;
		if (!imageContainer) return;

		const objectURL = window.URL.createObjectURL(file);
		if (fileImage) {
			fileImage.src = objectURL;
			imageContainer.appendChild(fileImage);
			setObjectURL(objectURL);
		}
	};

	return { handleUploadImage, uplpadImageRef };
};
