import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();

import { AllPlaces, AddPlace } from '@/screens';

const App = () => {
	return (
		<>
			<StatusBar style='auto' />
			<NavigationContainer>
				<Navigator>
					<Screen name='AllPlaces' component={AllPlaces} />
					<Screen name='AddPlace' component={AddPlace} />
				</Navigator>
			</NavigationContainer>
		</>
	);
};

export default App;
