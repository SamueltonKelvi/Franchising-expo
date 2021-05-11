import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../Home';
import SettingScreen from '../Settings';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'Home') {
                            return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
                        } else if (route.name === 'About') {
                            return <Ionicons name={focused ? 'alert-circle' : 'alert-circle-outline'} size={size} color={Utils.color.White} />;
                        } else if (route.name === 'Settings') {
                            return <Ionicons name={focused ? 'cog' : 'cog-outline'} size={size} color={color} />;
                        }
                    },
                })}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Settings" component={SettingScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}