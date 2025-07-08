import client from "../../api/client";
import { endpoints } from "../../api/endpoints";

export const getFilteredData = async (type: string, ids: Array<string>) => {
    const url =  endpoints.filteredcontent + "?filter_type=" + type + '&ids=' + ids + '&limit=20'
    return  await client.get(url);    
}

export const getRandomProduct = async (type: string, id: string) => {
    const url = endpoints.allproducts + "?filter[" + type + "][$eq]=" + id + "&page=1&limit=10&random=yes&stock_product=true"
    const response = await client.get(url);
    return response;
}