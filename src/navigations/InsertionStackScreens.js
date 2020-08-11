import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { BarcodeScannerInsert, InsertProcedure } from '../screens/InsertionStack';

const Stack = createStackNavigator();

const InsertionStackScreens = () => (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="BarcodeScannerInsert" component={BarcodeScannerInsert} />
        <Stack.Screen name="InsertProcedure" component={InsertProcedure} />
      </Stack.Navigator>
  );

  export default InsertionStackScreens;