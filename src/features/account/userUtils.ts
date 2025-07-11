import { getAllWishlistIds } from "../../stores/genx/screens/wishlist/wishlistApi";
import { userProfileDetails } from "./accountApi";


export const onLoginSyncUserData = () => {
    //profile data
    userProfileDetails()

    //cart count


    //wishlist count
    getAllWishlistIds()
}