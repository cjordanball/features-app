import { Text, View } from 'react-native';
import { styles } from './addPlaceStyle';
import { PlaceForm } from '@/components';
import { Place } from '@/types';
import { insertPlace } from '@/utilities/database';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const AddPlace = ({ navigation: nav }) => {
	const createPlaceHandler = async (place: Place) => {
		await insertPlace(place);
		nav.navigate('AllPlaces');
	};

	return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
