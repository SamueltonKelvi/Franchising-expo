import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';
import { FormInput, Button, AlertError, Loading } from '../../components';
import Utils from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Api from '../../services';
import { getTokenItem } from '../../services/AsyncStorage';

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        marginTop: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: Utils.color.White,
        alignItems: 'center',
        elevation: 2
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
        width: '96%',
        height: 'auto'
    },
    modalText: {
        marginBottom: 10,
        textAlign: "center",
        fontSize: 16,
    }

});

export default function Create({ modalVisible, setModalVisible }: any) {
    const [image, setImage] = React.useState<any>('image');
    const [cost, setCost] = React.useState<any>('');
    const [nameIngredients, setNameIngredients] = React.useState<any>('');
    const [quantity, setQuantity] = React.useState<any>('');
    const [nameProduct, setNameProduct] = React.useState<any>('');
    const [price, setPrice] = React.useState<any>('');
    const [error, setError] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<Boolean>(false);
    const [token, setToken] = React.useState<any>(null);

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

    React.useEffect(() => { handleToken(); }, [!token]);

    return (
        <View>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible); }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Inserir produtos</Text>
                        <Pressable style={{ padding: 5 }} onPress={() => setModalVisible(!modalVisible)}>
                            <Ionicons name="close" size={25} color={Utils.color.Red} />
                        </Pressable>
                    </View>
                    <ScrollView style={styles.scroll} alwaysBounceVertical={true}>
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
                            keyboardType="number-pad"
                            secureTextEntry={false}
                        />
                        <FormInput
                            title="Quantidade do ingrediente"
                            placeholder="Qtd: 0"
                            value={quantity}
                            onChangeText={(e: any) => setQuantity(e)}
                            keyboardType="number-pad"
                            secureTextEntry={false}
                        />
                        <FormInput
                            title="Preço do produto"
                            placeholder="R$ 00,00"
                            value={price}
                            onChangeText={(e: any) => setPrice(e)}
                            keyboardType="number-pad"
                            secureTextEntry={false}
                        />
                        {error && <AlertError title={error} />}
                        {loading ? <Loading /> : <Button title="SALVAR" onPress={handleSave} />}
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}