import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Utils from '../../utils';

const styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        paddingTop: 5,
        paddingBottom: 5,
    },
    text: {
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        width: '90%',
        textAlign: 'left',
        fontSize: 12,
        color: Utils.color.Black,
    },
    input: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        fontSize: 16,
        backgroundColor: Utils.color.Gray,
        borderWidth: 0.5
    }

});

interface ModelInput {
    title: String,
    placeholder: any,
    value: any,
    onChangeText: any,
    secureTextEntry: any,
    keyboardType: any,
}

export default function FormInput({ title, placeholder, value, onChangeText, secureTextEntry, keyboardType }: ModelInput) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />
        </View>
    )
}