import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, ScrollView, Image, View } from 'react-native';
import { styles } from './styles';
import { FormInput, Button, Loading, AlertError } from '../../components';
import Api from '../../services';
import { setTokenItem } from '../../services/AsyncStorage';

export default function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = React.useState<String>('');
    const [password, setPassword] = React.useState<String>('');
    const [loading, setLoading] = React.useState<Boolean>(false);
    const [alertError, setAlertError] = React.useState<any>(null);

    const handleSetState = () => {
        setUsername('');
        setPassword('');
    }

    const handleValidation = async () => {

        if (username === '' || password === '') {
            return setAlertError('Preencha todos os campos');
        } else {
            setAlertError(null);
            setLoading(true);

            const response = await Api({
                url: '/auth/login',
                method: 'POST',
                data: {
                    "password": password,
                    "username": username
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            switch (response.status) {
                case 200:
                    handleSetState();
                    setTokenItem(response.headers.authorization);
                    setLoading(false);
                    navigation.navigate('Tabs');
                    break;
                case 500:
                    setAlertError('Usuário inválido');
                    setLoading(false);
                    break;
                default:
                    setLoading(false);
                    return setAlertError('Usuário não encontrado');
            }
        }
    };

    return (
        <SafeAreaView style={styles.Container}>
            <ScrollView style={styles.Scroll} alwaysBounceVertical={true}>
                <View style={styles.Section}>
                    <Image style={styles.Logo} source={require('../../assets/img/login.png')} />
                </View>
                <View style={styles.Section}>
                    <FormInput
                        title="Nome"
                        placeholder="Usuário"
                        keyboardType="default"
                        value={username}
                        onChangeText={(e: any) => setUsername(e)}
                        secureTextEntry={false}
                    />
                    <FormInput
                        title="Senha"
                        placeholder="******"
                        keyboardType="number-pad"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(e: any) => setPassword(e)}
                    />
                </View>
                {alertError && <AlertError title={alertError} />}
                <View style={styles.Section}>
                    {loading ? <Loading /> : <Button title="ENTRAR" onPress={handleValidation} />}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}