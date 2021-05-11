import React from 'react';
import { View, Text } from 'react-native';
import { Styles } from './styles';

export default function Settings() {
    return (
        <View style={Styles.Container}>
            <Text style={Styles.Text}>Settings</Text>
        </View>
    );
}