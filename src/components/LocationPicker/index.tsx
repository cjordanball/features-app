import { useState } from 'react';
import { StyleSheet, View, Text, Alert, Image } from 'react-native';
import { getMapPreview } from '@/utilities/location';
import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '@/constants/colors';
import {
	getCurrentPositionAsync,
	useForegroundPermissions,
	PermissionStatus,
} from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { Map } from '@/screens';

const LocationPicker = () => {
	const nav = useNavigation();
	const [location, setLocation] = useState(null);
	const [locStatus, requestLocPermission] = useForegroundPermissions();

	const verifyPermissions = async () => {
		if (locStatus.status === PermissionStatus.UNDETERMINED) {
			const locPermissionResponse = await requestLocPermission();
			return locPermissionResponse.granted;
		}
		if (locStatus.status === PermissionStatus.DENIED) {
			Alert.alert(
				'Permission Denied',
				'You must grant device permission to use this app.'
			);
			return false;
		}
		return true;
	};

	const getLocationHandler = async () => {
		const hasLocPermission = await verifyPermissions();

		if (!hasLocPermission) {
			return;
		}
		const position = await getCurrentPositionAsync();

		setLocation({
			lat: position.coords.latitude,
			lng: position.coords.longitude,
		});
	};

	const pickOnMapHandler = () => {
		nav.navigate('Map');
	};

	let locationPreview = <Text>No location picked yet.</Text>;

	if (location) {
		locationPreview = (
			<Image
				style={styles.mapPreviewImage}
				source={{ uri: getMapPreview(location.lat, location.lng) }}
			/>
		);
	}

	return (
		<View>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.actions}>
				<OutlinedButton onPress={getLocationHandler} icon='location'>
					Locate User
				</OutlinedButton>
				<OutlinedButton onPress={pickOnMapHandler} icon='map'>
					Pick on Map
				</OutlinedButton>
			</View>
		</View>
	);
};

export default LocationPicker;

const styles = StyleSheet.create({
	mapPreview: {
		width: '100%',
		height: 200,
		marginVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary100,
		borderRadius: 4,
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignContent: 'center',
	},
	mapPreviewImage: {
		width: '100%',
		height: '100%',
		borderRadius: 4,
	},
});
