import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ContainerBarcodeScanner, ProcedureSelection } from '../screens/BarcodeStack';

const Stack = createStackNavigator();

const BarcodeStackScreens = () => (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Barcode" component={ContainerBarcodeScanner} />
        <Stack.Screen name="ProcedureSelection" component={ProcedureSelection} />
      </Stack.Navigator>
  );

  export default BarcodeStackScreens;