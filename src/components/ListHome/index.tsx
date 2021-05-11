import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Utils from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({

    container: {
        width: '95%',
        padding: 10,
        height: 150,
        elevation: 4,
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
        width: '50%',
        height: 'auto',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    colTree: {
        width: '10%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        fontSize: 14,
        paddingTop: 5,
    },
    ingredients: {
        fontSize: 12,
    }

});

export default function ListHome({ item, onPressDelete }: any) {
    return (
        <View style={styles.container} key={item.id}>
            <View style={styles.colOne}>
                <Image style={styles.img} source={require('../../assets/img/feijao.png')} />
            </View>
            <View style={styles.colTwo}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.description}>Ingredientes</Text>
                <Text style={styles.ingredients}>{item.price}</Text>
            </View>
            <View style={styles.colTree}>
                <Pressable>
                    <Ionicons name="create-outline" size={25} color={Utils.color.Black} />
                </Pressable>
                <Pressable onPress={onPressDelete}>
                    <Ionicons name="trash-outline" size={25} color={Utils.color.Red} />
                </Pressable>
            </View>
        </View >
    )
}