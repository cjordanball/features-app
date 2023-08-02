import { useState } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import {
	launchCameraAsync,
	useCameraPermissions,
	PermissionStatus,
} from 'expo-image-picker';
import { Colors } from '@/constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

interface ImagePickerProps {
	onImageTaken: (arg: string) => void;
}

const ImagePicker = ({ onImageTaken }: ImagePickerProps) => {
	const [imagePath, setImagePath] = useState('');
	const [camStatus, requestPermission] = useCameraPermissions();

	const verifyPermissions = async () => {
		if (camStatus.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();
			return permissionResponse.granted;
		}
		if (camStatus.status === PermissionStatus.DENIED) {
			Alert.alert(
				'Permission Denied',
				'You need to grant camera permission to use this app.'
			);
			return false;
		}
		return true;
	};

	const takeImageHandler = async () => {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) {
			return;
		}
		const image = await launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});

		setImagePath(image.assets[0].uri);
		onImageTaken(image.assets[0].uri);
	};

	let imagePreview = <Text>No image taken yet.</Text>;

	if (imagePath) {
		imagePreview = <Image style={styles.image} source={{ uri: imagePath }} />;
	}
	return (
		<View>
			<View style={styles.imagePreview}>{imagePreview}</View>
			<OutlinedButton icon={`camera`} onPress={takeImageHandler}>
				Take Image
			</OutlinedButton>
		</View>
	);
};

export default ImagePicker;

const styles = StyleSheet.create({
	imagePreview: {
		width: '100%',
		height: 200,
		marginVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary100,
		borderRadius: 4,
	},
	image: {
		width: '100%',
		height: '100%',
	},
});
