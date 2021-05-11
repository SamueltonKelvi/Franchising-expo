import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Utils from '../../utils';

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: 'auto',
        padding: 5,
    },
    text: {
        color: Utils.color.Red,
        fontSize: 14,
        textAlign: 'center'
    }

});

export default function AlertError({ title }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}