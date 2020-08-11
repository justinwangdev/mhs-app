import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SearchScreen, ResultScreen } from '../screens/QueryStack';

const Stack = createStackNavigator();

const QueryStackScreens = () => (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
      </Stack.Navigator>
  );

  export default QueryStackScreens;