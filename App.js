import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from '@/components';
import { Colors } from '@/constants/colors';

const { Screen, Navigator } = createNativeStackNavigator();

import { AllPlaces, AddPlace, Map } from '@/screens';

const App = () => {
	return (
		<>
			<StatusBar style='auto' />
			<NavigationContainer>
				<Navigator
					screenOptions={{
						headerStyle: { backgroundColor: Colors.primary500 },
						headerTintColor: Colors.gray700,
						contentStyle: { backgroundColor: Colors.gray700 },
					}}
				>
					<Screen
						name='AllPlaces'
						component={AllPlaces}
						options={({ navigation: nav }) => ({
							title: 'Your Favorites',
							headerRight: ({ tintColor }) => (
								<IconButton
									icon='add'
									size={24}
									color={tintColor}
									onPress={() => nav.navigate('AddPlace')}
								/>
							),
						})}
					/>
					<Screen
						name='AddPlace'
						component={AddPlace}
						options={{
							title: 'Add a New Place',
						}}
					/>
					<Screen name='Map' component={Map} />
				</Navigator>
			</NavigationContainer>
		</>
	);
};

export default App;
