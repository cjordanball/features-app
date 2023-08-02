import { GOOGLE_MAPS_URI, GOOGLE_API_KEY } from '@env';

const GOOGLE_REVERSE_GEOCODING_URI =
	'https://maps.googleapis.com/maps/api/geocode/json';

export const getMapPreview = (lat: number, lng: number) => {
	const imagePreviewUrl = `${GOOGLE_MAPS_URI}?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
	return imagePreviewUrl;
};

export const getAddress = async (lat: number, lng: number) => {
	const response = await fetch(
		`${GOOGLE_REVERSE_GEOCODING_URI}?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch address');
	}
	const data = await response.json();
	const address = data.results[0].formatted_address;
	return address;
};
