import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Utils from '../../utils';

const styles = StyleSheet.create({

    container: {
        width: '95%',
        padding: 10,
        height: 150,
        elevation: 2,
        backgroundColor: Utils.color.White,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    colOne: {
        width: '40%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    colTwo: {
        width: '60%',
        height: 'auto',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 12,
        flexWrap: 'wrap',
    }

});

export default function ListHome({ item }: any) {
    return (
        <View style={styles.container} key={item.id}>
            <View style={styles.colOne}>
                <Image style={styles.img} source={require('../../assets/img/feijao.png')} />
            </View>
            <View style={styles.colTwo}>
                <Text style={styles.text}>{item.name}</Text>
                <Text numberOfLines={3} style={styles.description}>{item.description}</Text>
            </View>
        </View>
    )
}