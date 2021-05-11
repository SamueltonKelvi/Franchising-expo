import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/Splash';
import LoginScreen from '../screens/Login';
import TabsScreen from '../screens/Tabs';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Splash" headerMode="none">
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Tabs" component={TabsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}