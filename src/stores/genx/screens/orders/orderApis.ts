import apiClient from "../../../../api/client";
import { endpoints } from "../../../../api/endpoints";



export const getOrders = async (filter = '', page = 1) => {
    const url =
        filter !== 'all'
            ? endpoints.orderlist + '?' + filter + '&page=' + page + '&limit=10'
            : endpoints.orderlist + '?page=' + page + '&limit=10';
    const response = await apiClient.get(url);
    return response;
};