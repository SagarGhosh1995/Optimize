import apiClient from "../../../../api/client";
import { endpoints } from "../../../../api/endpoints";


export const homePageCMS = async () => {
    const response = await apiClient.get(endpoints.genxhomecms);
    return response;
}

export const homePageBanner = async (title="") => {
    const response = await apiClient.get(endpoints.bannerep+title);
    return response;
}

export const homePageRandomProduct = async () => {
    const response = await apiClient.get(endpoints.allproducts+"?page=1&limit=20");
    return response;
}
