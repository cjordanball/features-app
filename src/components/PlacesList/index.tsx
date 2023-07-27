import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PlaceItem } from '@/components';
import { Colors } from '@/constants/colors';

const PlacesList = ({ places }) => {
	if (!places || places.length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>No places found. Maybe add one?</Text>
			</View>
		);
	}
	return (
		<FlatList
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={({ item, index }) => (
				<PlaceItem
					place={item}
					onSelect={() => {
						console.log('Pressed');
					}}
				/>
			)}
		/>
	);
};

export default PlacesList;

const styles = StyleSheet.create({
	fallbackContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	fallbackText: {
		color: Colors.primary200,
		fontSize: 16,
	},
});
