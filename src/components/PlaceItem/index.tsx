import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	Image,
	View,
} from 'react-native';
import { Place } from '@/types';

interface PlaceItemProps {
	place: Place;
	onSelect: () => void;
}

const PlaceItem = ({ place, onSelect }: PlaceItemProps) => {
	return (
		<Pressable onPress={onSelect}>
			<Image source={{ uri: place.imageURL }} />
			<View>
				<Text>{place.title}</Text>
				<Text>{place.address}</Text>
			</View>
		</Pressable>
	);
};

export default PlaceItem;

const styles = StyleSheet.create({});
