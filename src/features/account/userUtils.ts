import { useAppDispatch } from "../../globalRedux/useTypedHooks";
import { genxStore } from "../../stores/genx/redux/store";
import { setAuthData, UserAuthDataType } from "../auth/authSlice";
import { userProfileDetails } from "./accountApi";


export const onLoginSyncUserData = () => {
    //profile data
    userProfileDetails()

    //cart count


    //wishlist count
}