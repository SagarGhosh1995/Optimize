import client from "../../api/client";
import { endpoints } from "../../api/endpoints";


export const sendUserOtp = async(contact: any) => {
    return  await client.post(endpoints.sendotp, { contact });    
}

export const verifyUserOtp = async(param: any) => {
    return  await client.post(endpoints.verifyotp, param);    
}