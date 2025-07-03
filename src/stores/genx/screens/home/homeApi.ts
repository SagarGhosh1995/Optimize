import api from "../../../../api";
import { endpoints } from "../../../../api/endpoints";


export const homePageCMS = async () => {
    const response = await api.get(endpoints.genxhomecms);
    return response;
}

export const homePageBanner = async (title="") => {
    const response = await api.get(endpoints.bannerep+title);
    return response;
}

export const homePageRandomProduct = async () => {
    const response = await api.get(endpoints.allproducts);
    return response;
}
