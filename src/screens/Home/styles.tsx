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
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: utils.color.White,
        marginBottom: 10,
    },
    HeaderText:{
        fontSize: 18,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    AddButton:{
        padding: 5,
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