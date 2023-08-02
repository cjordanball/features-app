import { useLayoutEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import MapView, {
	Marker,
	MapPressEvent,
	MapMarkerProps,
} from 'react-native-maps';
import { IconButton } from '@/components';
import { styles } from './mapStyle';

const Map = ({ navigation }) => {
	const [selectedLocation, setSelectedLocation] = useState<{
		lat: number;
		lng: number;
	}>();

	const region = {
		latitude: 37.78,
		longitude: -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	const selectLocationHandler = (event: MapPressEvent) => {
		const lat = event.nativeEvent.coordinate.latitude;
		const lng = event.nativeEvent.coordinate.longitude;
		setSelectedLocation({ lat, lng });
	};

	const savePickedLocationHandler = useCallback(() => {
		if (!selectedLocation) {
			Alert.alert(
				'No location picked',
				'You must pick a location by tapping on the map.'
			);
			return;
		}
		navigation.navigate('AddPlace', {
			pickedLat: selectedLocation.lat,
			pickedLng: selectedLocation.lng,
		});
	}, [navigation, selectedLocation]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: ({ tintColor }) => (
				<IconButton
					icon='save'
					size={24}
					color={tintColor}
					onPress={() => {
						savePickedLocationHandler();
					}}
				/>
			),
		});
	}, [navigation, savePickedLocationHandler]);

	return (
		<MapView
			initialRegion={region}
			onPress={selectLocationHandler}
			style={styles.map}
		>
			{selectedLocation && (
				<Marker
					coordinate={{
						latitude: selectedLocation.lat,
						longitude: selectedLocation.lng,
					}}
				/>
			)}
		</MapView>
	);
};

export default Map;
