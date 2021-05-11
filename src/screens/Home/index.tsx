import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, ScrollView, SafeAreaView, FlatList, Pressable } from 'react-native';
import { styles } from './styles';
import { ListHome, Loading, Create } from '../../components';
import { findProductList } from '../../services/Requests';

export default function Home() {
    const navigation = useNavigation();
    const [data, setData] = React.useState<any>([]);
    const [loading, setLoading] = React.useState<Boolean>(false);
    const [modalCreate, setModalCreate] = React.useState<Boolean>(false);
    const [empty, setEmpty] = React.useState<any>('Lista de produtos vazia!');
    const _PAGE: any = 1;
    const _SIZE: any = 10;

    const handleFindProducts = async () => {
        setLoading(true);

        const response = await findProductList(_PAGE, _SIZE);

        switch (response.status) {
            case 200:
                setLoading(false);
                let products = response.data.content;
                setData(data.concat(products));
                break;
            case 401 || 400 || 500:
                setEmpty('Sem acesso à lista de produtos');
                setData(data);
                setLoading(false);
                break;
            default:
                setLoading(false);
                setData(data);
                return setEmpty('Nenhum produto encontrado!');
        }
    }

    React.useEffect(() => { handleFindProducts(); }, []);

    return (
        <SafeAreaView style={styles.Container}>
            { modalCreate && <Create modalVisible={modalCreate} setModalVisible={setModalCreate}/> }
            <View style={styles.Header}>
                <Text style={styles.HeaderText}>Lista de produtos</Text>
            </View>
            <ScrollView style={styles.Scroll} alwaysBounceVertical={true}>
                {data.length >= 1 ?
                    <FlatList
                        data={data}
                        initialNumToRender={10}
                        renderItem={({ item }: any) => <ListHome item={item} />}
                        keyExtractor={(item) => item = item.id}
                    />
                    :
                    <>
                        {loading && <Loading />}
                        <Text style={styles.Text}>{empty}</Text>
                        <Pressable style={styles.ButtonAdd} onPress={() => setModalCreate(true)}>
                            <Text style={styles.ButtonText}>Inserir produto</Text>
                        </Pressable>
                    </>
                }
            </ScrollView>
        </SafeAreaView>
    );
}