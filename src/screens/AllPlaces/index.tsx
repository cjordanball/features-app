import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { styles } from './allPlacesStyle';
import { PlacesList } from '@/components';
import { Place } from '@/types';
import { fetchPlaces } from '@/utilities/database';

const AllPlaces = ({ route }) => {
	const [loadedPlaces, setLoadedPlaces] = useState<Array<Place>>([]);
	const isFocused = useIsFocused();

	useEffect(() => {
		const fetcher = async () => {
			const allPlaces: any = await fetchPlaces();
			setLoadedPlaces(allPlaces);
		};
		if (isFocused) {
			fetcher();
		}
	}, [isFocused]);

	return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
