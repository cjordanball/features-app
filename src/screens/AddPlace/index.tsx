import { Text, View } from 'react-native';
import { styles } from './addPlaceStyle';
import { PlaceForm } from '@/components';
import { Place } from '@/types';

const AddPlace = ({ navigation: nav }) => {
	const createPlaceHandler = (place: Place) => {
		nav.navigate('AllPlaces', {
			place: place,
		});
	};

	return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
