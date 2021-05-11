import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, Image, ScrollView, Platform } from 'react-native';
import FormInput from '../FormInput';
import Button from '../Button';
import Loading from '../Loading';
import AlertError from '../AlertError';
import Utils from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Api from '../../services';
import { getTokenItem } from '../../services/AsyncStorage';
import * as ImagePicker from 'expo-image-picker';

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: Utils.color.White,
        alignItems: 'center',
        elevation: 2,
        marginTop: 50,
        paddingBottom: '10%'
    },
    scroll: {
        width: '100%',
        height: '100%'
    },
    modalView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 10,
        width: '90%',
        height: 'auto'
    },
    modalText: {
        marginBottom: 10,
        textAlign: "center",
        fontSize: 16,
    },
    pressImg: {
        padding: 10,
        width: '90%',
        alignSelf: 'center',
        elevation: 5,
        margin: 10,
        backgroundColor: Utils.color.Gray
    },
    pressImgText: {
        textAlign: 'center',
        fontSize: 14,
    }

});

export default function Create({ modalVisible, setModalVisible }: any) {
    const [image, setImage] = React.useState<any>(null);
    const [cost, setCost] = React.useState<any>('');
    const [nameIngredients, setNameIngredients] = React.useState<any>('');
    const [quantity, setQuantity] = React.useState<any>('');
    const [nameProduct, setNameProduct] = React.useState<any>('');
    const [price, setPrice] = React.useState<any>('');
    const [error, setError] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<Boolean>(false);
    const [token, setToken] = React.useState<any>(null);

    const handleImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    console.log(`Image ${image}`);

    const handleSetState = () => {
        setCost('');
        setNameIngredients('');
        setQuantity('');
        setNameProduct('');
        setPrice('');
    }

    const handleToken = async () => {
        const user = await getTokenItem();
        return setToken(user);
    }

    const handleSave = async () => {
        if (cost === '' || nameIngredients === '' || quantity === '' || nameProduct === '' || price === '') {
            return setError('Preencha todos os campos');
        } else {
            setError('');
            setLoading(true);

            const data = {
                image: image,
                ingredients: [{
                    cost: cost,
                    name: nameIngredients,
                    quantity: quantity,
                }],
                name: nameProduct,
                price: price
            }

            const response = await Api({
                method: 'POST',
                url: '/product/save',
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${JSON.parse(token)}`
                }
            });

            if (response.status !== 200) {
                setLoading(false);
                return setError('Algo deu errado');
            }

            setLoading(false);
            handleSetState();
            return setModalVisible(!modalVisible);
        }
    }

    React.useEffect(() => {

        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();

        handleToken();

    }, [!token]);

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => { setModalVisible(!modalVisible); }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Inserir produtos</Text>
                    <Pressable style={{ padding: 0 }} onPress={() => setModalVisible(!modalVisible)}>
                        <Ionicons name="close" size={25} color={Utils.color.Red} />
                    </Pressable>
                </View>
                <ScrollView style={styles.scroll} alwaysBounceVertical={true}>
                    <Pressable style={styles.pressImg} onPress={handleImagePicker}>
                        <Text style={styles.pressImgText}>Buscar imagem</Text>
                    </Pressable>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    <FormInput
                        title="Nome do produto"
                        placeholder="Ex: Café Santa Clara"
                        value={nameProduct}
                        onChangeText={(e: any) => setNameProduct(e)}
                        keyboardType="default"
                        secureTextEntry={false}
                    />
                    <FormInput
                        title="Nome do ingrediente"
                        placeholder="Ex: Sazon"
                        value={nameIngredients}
                        onChangeText={(e: any) => setNameIngredients(e)}
                        keyboardType="default"
                        secureTextEntry={false}
                    />
                    <FormInput
                        title="Custo do ingrediente"
                        placeholder="R$ 00,00"
                        value={cost}
                        onChangeText={(e: any) => setCost(e)}
                        keyboardType="numeric"
                        secureTextEntry={false}
                    />
                    <FormInput
                        title="Quantidade do ingrediente"
                        placeholder="Qtd: 0"
                        value={quantity}
                        onChangeText={(e: any) => setQuantity(e)}
                        keyboardType="numeric"
                        secureTextEntry={false}
                    />
                    <FormInput
                        title="Preço do produto"
                        placeholder="R$ 00,00"
                        value={price}
                        onChangeText={(e: any) => setPrice(e)}
                        keyboardType="numeric"
                        secureTextEntry={false}
                    />
                    {error && <AlertError title={error} />}
                    {loading ? <Loading /> : <Button title="SALVAR" onPress={handleSave} />}
                </ScrollView>
            </View>
        </Modal>
    );
}