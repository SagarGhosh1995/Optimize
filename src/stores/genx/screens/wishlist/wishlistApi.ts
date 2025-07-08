import api from "../../../../api";
import apiClient from "../../../../api/client";
import { endpoints } from "../../../../api/endpoints";


export const getWishlist = async (page = 1) => {
    console.log(endpoints.wishlist+"?page="+page+"&limit=10");
    
    const response = await apiClient.get(endpoints.wishlist+"?page="+page+"&limit=10");
    return response;
}