import { GOOGLE_MAPS_URI, GOOGLE_API_KEY } from '@env';

export const getMapPreview = (lat: number, lng: number) => {
	const imagePreviewUrl = `${GOOGLE_MAPS_URI}?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
	console.log('IPU: ', imagePreviewUrl);
	return imagePreviewUrl;
};
