import apiClient from "../../../../api/client";
import { endpoints } from "../../../../api/endpoints";
import { API_ERROR, DATA_FORMAT_ERROR, warn } from "../../../../shared/utils/log";
import { genxStore } from "../../redux/store";
import { setWishListIds } from "./wishlistSlice";


export const getWishlist = async (page = 1) => {
    const response = await apiClient.get(endpoints.wishlist + "?page=" + page + "&limit=10");
    return response;
}

export const getAllWishlistIds = async () => {
    const response = await apiClient.get(endpoints.wishlistids);
    if (response?.success) {
        if (response?.data?.product_ids) {
            genxStore.dispatch(setWishListIds(response?.data?.product_ids ?? []))
            return true
        } else {
            warn(DATA_FORMAT_ERROR + ' getAllWishlistIds', response?.data)
            return false
        }
    } else {
        warn(API_ERROR + ' getAllWishlistIds ', response)
        return false
    }
}