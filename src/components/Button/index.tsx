import React from 'react';
import { Text, Pressable, StyleSheet, LayoutAnimation } from 'react-native';
import Utils from '../../utils';

const styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
        height: 'auto',
        marginTop: 10,
        marginBottom: 5,
        padding: 8,
        backgroundColor: Utils.color.BrightTurquoise,
        borderRadius: 10,
    },
    text: {
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        width: '90%',
        textAlign: 'center',
        fontSize: 16,
        color: Utils.color.Black,
    }
});

interface ModalButton {
    title: String,
    onPress: any
}

export default function Button({ title, onPress }: ModalButton) {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}