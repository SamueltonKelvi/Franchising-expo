import Api from '../../services';
import { getTokenItem } from '../AsyncStorage';

export const findProductList = async ({ page, size }: any) => {
    const token = getTokenItem();

    try {
        const response = await Api({
            url: `/product/list?page=${page}&size=${size}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}
export const addProductList = async ({ data }: any) => {
    const token = getTokenItem();

    try {
        const response = await Api({
            url: '/product/save',
            method: 'POST',
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}