import { StyleSheet } from 'react-native';
import Utils from '../../utils';

export const Styles = StyleSheet.create({

    Container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Utils.color.White
    },
    Text: {
        fontSize: 20,
        color: Utils.color.Black,
    }

});