import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SplashScreen,
  HomeScreen,
  VillaDetailScreen,
  SearchResultScreen
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
      <Stack.Screen 
        name="SearchResult" 
        component={SearchResultScreen} 
        options={{
          headerShown: true, 
          headerTitle: 'Search villa',
          headerBackTitleVisible: false,
          gestureEnabled: true,
        }}  
      />
    </Stack.Navigator>
  );
};

export default Router;