import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SplashScreen,
  HomeScreen,
  VillaDetailScreen
} from '../screens';

const Stack = createStackNavigator();

const Router = () => {
  return (
  	<Stack.Navigator 
			initialRouteName="Splash" 
			screenOptions={{
				headerShown: false
			}}
		>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VillaDetail" component={VillaDetailScreen} />
    </Stack.Navigator>
  );
};

export default Router;