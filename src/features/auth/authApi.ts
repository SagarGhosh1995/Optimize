import apiClient from "../../api/client";
import { endpoints } from "../../api/endpoints";


export const sendUserOtp = async(contact: any) => {
    return  await apiClient.post(endpoints.sendotp, { contact });    
}

export const verifyUserOtp = async(param: any) => {
    return  await apiClient.post(endpoints.verifyotp, param);    
}