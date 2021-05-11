import { StyleSheet } from 'react-native';
import Utils from '../../utils';

export const styles = StyleSheet.create({

    Container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Utils.color.White
    },
    Scroll:{
        width: '100%',
        height: '100%'
    },
    Text: {
        fontSize: 20
    },
    Section: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        padding: 10,
    },
    Logo:{
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
});