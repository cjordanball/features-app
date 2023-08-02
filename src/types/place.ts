import { ImageSourcePropType } from 'react-native';

type Place = {
	title: String;
	imageURL: ImageSourcePropType;
	address: String;
	location: { lat: number; lng: number };
	id: String;
};

export default Place;
