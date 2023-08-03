import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { styles } from './allPlacesStyle';
import { PlacesList } from '@/components';
import { Place } from '@/types';

const AllPlaces = ({ route }) => {
	const [loadedPlaces, setLoadedPlaces] = useState<Array<Place>>([]);
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused && route.params) {
			setLoadedPlaces((loadedPlaces) => [...loadedPlaces, route.params.place]);
		}
	}, [isFocused, route]);

	return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
