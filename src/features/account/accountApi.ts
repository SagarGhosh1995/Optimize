import apiClient from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { API_ERROR, DATA_FORMAT_ERROR, warn } from "../../shared/utils/log";
import { genxStore } from "../../stores/genx/redux/store";
import { setUserData } from "./accountSlice";



export const userProfileDetails = async () => {
    const response = await apiClient.get(endpoints.profiledata);    
    if (response?.success) {
        if (response?.data?.userDetails) {
            genxStore.dispatch(setUserData(response?.data?.userDetails))
        } else {
            warn(DATA_FORMAT_ERROR+' in userProfileDetails ', response?.data)
        }
    } else {
        warn(API_ERROR,response)
    }

}