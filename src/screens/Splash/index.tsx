import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { Styles } from './styles';
import { getTokenItem } from '../../services/AsyncStorage';

export default function Splash() {
    const navigation = useNavigation();
    const [token, setToken] = React.useState<any>(null);

    const handleToken = async () => {
        const user = await getTokenItem();
        return setToken(user);
    }

    const handleNavigation = () => {
        if (token) {
            setTimeout(() => {
                navigation.navigate('Tabs');
            }, 1500);
        } else {
            setTimeout(() => {
                navigation.navigate('Login');
            }, 1500);
        }
    }

    React.useEffect(() => { handleToken(); handleNavigation(); }, [token]);

    return (
        <View style={Styles.Container}>
            <Text style={Styles.Text}>Pro Franchising</Text>
        </View>
    );
}