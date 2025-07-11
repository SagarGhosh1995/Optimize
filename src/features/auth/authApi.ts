import apiClient from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { StoreIds } from "../../globalContext/StoreContext";
import { genxStore } from "../../stores/genx/redux/store";
import { clearWishlistIds } from "../../stores/genx/screens/wishlist/wishlistSlice";
import { clearAccount } from "../account/accountSlice";
import { clearAuth } from "./authSlice";


export const sendUserOtp = async (contact: any) => {
    return await apiClient.post(endpoints.sendotp, { contact });
}

export const verifyUserOtp = async (param: any) => {
    return await apiClient.post(endpoints.verifyotp, param);
}

export const logout = async (storeId: StoreIds) => {
    if (storeId === 'genx') {
        genxStore.dispatch(clearAuth())
        genxStore.dispatch(clearAccount())
        genxStore.dispatch(clearWishlistIds())
    }
}