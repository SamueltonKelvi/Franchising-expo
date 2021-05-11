import { StyleSheet } from 'react-native';
import utils from '../../utils';
import Utils from '../../utils';

export const styles = StyleSheet.create({

    Container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Header:{
        width: '100%',
        padding: 10,
        backgroundColor: utils.color.White,
        marginBottom: 10,
    },
    HeaderText:{
        fontSize: 18,
        textAlign: 'center',
    },
    Scroll: {
        width: '100%',
        height: '100%'
    },
    Text: {
        fontSize: 16,
        textAlign: 'center',
    },
    ButtonAdd: {
        width: 'auto',
        height: 'auto',
        padding: 10,
        alignSelf: 'center',
        elevation: 2,
        backgroundColor: utils.color.Gray,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    ButtonText: {
        fontSize: 16,
        textAlign: 'center',
        color: Utils.color.Black
    }

});