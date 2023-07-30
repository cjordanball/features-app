import { ImageSourcePropType } from 'react-native';

type Place = {
	title: String;
	imageURL: ImageSourcePropType;
	address: String;
	location: Location;
	id: String;
};

export default Place;
