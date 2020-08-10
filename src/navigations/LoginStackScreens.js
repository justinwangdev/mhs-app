import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ForgotPasswordScreen, LoginScreen, Welcome} from '../screens/LoginStack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const LoginStackScreens = () => (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  export default React.memo(LoginStackScreens);