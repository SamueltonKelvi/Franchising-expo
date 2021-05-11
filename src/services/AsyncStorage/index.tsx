import AsyncStorage from '@react-native-async-storage/async-storage';
const TOKEN = '@async/token';

export const getTokenItem = () => {
    return AsyncStorage.getItem(TOKEN);
}

export const setTokenItem = ({data}: any) => {
    return AsyncStorage.setItem(TOKEN, JSON.stringify(data));
}

export const removeTokenItem = () => {
    return AsyncStorage.removeItem(TOKEN);
}