import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, ScrollView, SafeAreaView, FlatList, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import Utils from '../../utils';
import { ListHome, Loading, Create } from '../../components';
import Api from '../../services';
import { getTokenItem } from '../../services/AsyncStorage';

export default function Home() {
    const navigation = useNavigation();
    const [token, setToken] = React.useState<any>(null);
    const [data, setData] = React.useState<any>([]);
    const [loading, setLoading] = React.useState<Boolean>(false);
    const [modalCreate, setModalCreate] = React.useState<Boolean>(false);
    const [empty, setEmpty] = React.useState<any>('Lista de produtos vazia!');
    const [page, setPage] = React.useState<any>(1);
    const [size, setSize] = React.useState<any>(10);

    const handleToken = async () => {
        const user = await getTokenItem();
        return setToken(user);
    }

    const handleFindProducts = async () => {
        setLoading(true);

        const response = await Api({
            url: `/product/list?page=${page}&size=${size}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${JSON.parse(token)}`
            }
        });

        if (response.status !== 200) {
            setLoading(false);
            return setEmpty('Algo deu errado');
        }

        setLoading(false);
        setEmpty(empty);
        return setData(data.concat(response.data.content));
    }

    const handleDeleteItem = async (id) => {
        return await Api.delete(`/product/delete/${id}`);
    };

    console.log(`Data ${data}`);

    React.useEffect(() => { handleFindProducts(); handleToken(); }, [!data]);

    return (
        <SafeAreaView style={styles.Container}>
            { modalCreate && <Create modalVisible={modalCreate} setModalVisible={setModalCreate} />}
            <View style={styles.Header}>
                <Text style={styles.HeaderText}>Lista de produtos</Text>
                <Pressable style={styles.AddButton} onPress={() => setModalCreate(true)}>
                    <Ionicons name="add" size={25} color={Utils.color.Black} />
                </Pressable>
            </View>
            <ScrollView style={styles.Scroll} alwaysBounceVertical={true}>
                {data.length >= 1 ?
                    <FlatList
                        data={data}
                        initialNumToRender={5}
                        renderItem={({ item }: any) => <ListHome item={item} onPressDelete={() => handleDeleteItem(item.id)}/>}
                        keyExtractor={(item) => item = item.id}
                        onEndReached={() => handleFindProducts()}
                        onEndReachedThreshold={0.1}
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