import { Text, View } from 'react-native';
import { styles } from './allPlacesStyle';
import { PlacesList } from '@/components';

const AllPlaces = ({ route }) => {
	console.log('Stuff: ', route.params);
	return <PlacesList places={[]} />;
};

export default AllPlaces;
