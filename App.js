import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { init as DatabaseInit } from '@/utilities/database';
import { IconButton } from '@/components';
import { Colors } from '@/constants/colors';

const { Screen, Navigator } = createNativeStackNavigator();

import { AllPlaces, AddPlace, Map } from '@/screens';

const App = () => {
	const [dbLoaded, setDBLoaded] = useState(false);
	useEffect(() => {
		DatabaseInit()
			.then(() => {
				setDBLoaded(true);
			})
			.catch((err) => {
				console.log('ERR: ', err);
			});
	}, []);

	// SplashScreen.preventAutoHideAsync();

	const onLayoutRootView = async () => {
		if (dbLoaded) {
			await SplashScreen.hideAsync();
		}
	};

	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
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
		</View>
	);
};

export default App;
