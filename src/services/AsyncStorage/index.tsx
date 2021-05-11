import AsyncStorage from '@react-native-async-storage/async-storage';
const TOKEN = '@async/token';

export const getTokenItem = async () => {
    return await AsyncStorage.getItem(TOKEN);
}

export const setTokenItem = async (data) => {
    return await AsyncStorage.setItem(TOKEN, JSON.stringify(data));
}

export const removeTokenItem = async () => {
    return await AsyncStorage.removeItem(TOKEN);
}