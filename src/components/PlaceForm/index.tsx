import { useState, useCallback } from 'react';
import {
	StyleSheet,
	ScrollView,
	TextInput,
	Text,
	View,
	ImageSourcePropType,
} from 'react-native';
import { Colors } from '@/constants/colors';
import ImagePicker from '../ImagePicker';
import LocationPicker from '../LocationPicker';
import Button from '../UI/Button';
import { Place, Location } from '@/types';

interface PlaceFormProps {
	onCreatePlace: (data: Place) => void;
}

const PlaceForm = ({ onCreatePlace }: PlaceFormProps) => {
	const [enteredTitle, setEnteredTitle] = useState('');
	const [selectedImage, setSelectedImage] = useState('');
	const [chosenLocation, setChosenLocation] = useState<Location>();
	const changeTitleHandler = (enteredText: string) => {
		setEnteredTitle(enteredText);
	};

	const SavePlaceHandler = () => {
		const placeData: Place = {
			title: enteredTitle,
			imageURL: selectedImage as ImageSourcePropType,
			address: chosenLocation.address,
			location: { lat: chosenLocation.lat, lng: chosenLocation.lng },
			id: new Date().toString() + Math.random().toString(),
		};
		onCreatePlace(placeData);
	};

	const takeImageHandler = (imageUri: string) => {
		setSelectedImage(imageUri);
	};

	const chooseLocationHandler = useCallback((loc: Location) => {
		setChosenLocation(loc);
	}, []);

	return (
		<ScrollView style={styles.form}>
			<View>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.input}
					onChangeText={changeTitleHandler}
					value={enteredTitle}
				/>
			</View>
			<ImagePicker onImageTaken={takeImageHandler} />
			<LocationPicker onLocationChosen={chooseLocationHandler} />
			<Button onPress={SavePlaceHandler}>Add Place</Button>
		</ScrollView>
	);
};

export default PlaceForm;

const styles = StyleSheet.create({
	form: {
		flex: 1,
		padding: 24,
	},
	label: {
		fontWeight: 'bold',
		marginBottom: 4,
		color: Colors.primary500,
	},
	input: {
		marginVertical: 8,
		paddingHorizontal: 4,
		paddingVertical: 8,
		fontSize: 16,
		borderBottomColor: Colors.primary700,
		borderBottomWidth: 2,
		backgroundColor: Colors.primary100,
	},
});
