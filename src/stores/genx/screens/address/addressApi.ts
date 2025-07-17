import apiClient from "../../../../api/client";
import { endpoints } from "../../../../api/endpoints";
import { warn } from "../../../../shared/utils/log";
import { showToast } from "../../../../shared/utils/toast";
import { genxStore } from "../../redux/store";
import { deleteAddress, setAddress } from "./addressSlice";



export const getAddressList = async (page = 1) => {
    const storeAddress = genxStore.getState()?.address?.address
    const response = await apiClient.get(endpoints.addresslist + "?page=" + page + "&limit=10");
    if (response?.success) {
        if (storeAddress?.length > 0) {
            if (page !== response?.data?.pagination?.totalPages)
                genxStore.dispatch(setAddress([...storeAddress, ...response?.data?.data]))
        } else {
            genxStore.dispatch(setAddress(response?.data?.data))
        }
    } else {
        warn('address list error => ', response)
    }
    return response;
}

export const deleteUserAddress = async (id: string) => {
    const url = `${endpoints.deleteaddress}${id}`;
    const response = await apiClient.post(url);
    console.log(response);
    if (response?.success) {
        genxStore.dispatch(deleteAddress(id))
        showToast('success', response?.message)
    } else {
        showToast('error', response?.message)
    }
    return response;
};