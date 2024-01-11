'use client';

import React, { useRef, useState, useEffect } from 'react';

export const usePreviewUploadImage = () => {
	const clientUploadRef = useRef<HTMLElement>(null);
	const [clientUploadObjectURL, setObjectURL] = useState('');
	const [clientFileImage, setClientFileImage] =
		useState<HTMLImageElement | null>(null);
	const [clientUploadFile, setClientUploadFile] = useState<File | null>(null);
	const [clientUploadFileName, setClientUploadFileName] = useState('');

	useEffect(() => {
		const img = new Image();
		setClientFileImage(img);
	}, []);

	const resetSelection = () => {
		if (clientFileImage) clientFileImage.src = '';

		const imageContainer = clientUploadRef.current;
		if (imageContainer && clientFileImage?.parentNode === imageContainer) {
			imageContainer.removeChild(clientFileImage);
		}

		if (clientUploadObjectURL) {
			window.URL.revokeObjectURL(clientUploadObjectURL);
			setObjectURL('');
			setClientUploadFile(null);
			setClientUploadFileName('');
		}
	};

	const handleClientUpload: React.ChangeEventHandler<HTMLInputElement> = (
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

		const imageContainer = clientUploadRef.current;
		if (!imageContainer) return;

		const objectUrl = window.URL.createObjectURL(file);
		if (clientFileImage) {
			clientFileImage.src = objectUrl;
			imageContainer.appendChild(clientFileImage);
			setObjectURL(objectUrl);
			setClientUploadFile(file);
			setClientUploadFileName(file.name);
		}
	};

	return {
		handleClientUpload,
		clientUploadRef,
		clientUploadObjectURL,
		clientUploadFile,
		clientUploadFileName,
	};
};
