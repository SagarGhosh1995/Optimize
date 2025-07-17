export const endpoints = {
    sendotp: 'v1/auth/b2c/send/login/otp',
    verifyotp: 'v1/auth/b2c/veryfy/loging/otp',
    genxhomecms: "v1/cms/get-active-content?content_type=b2c-home-app",
    bannerep: "v1/app/get-shop-page-banner",
    allproducts: 'v1/products/get-all-products',
    filteredcontent: "v1/cms/get-filter-content",
    wishlist: 'v1/wishlist/get-wishlist/b2c',
    wishlistids: "/v1/wishlist/get/ids",
    profiledata: "v1/auth/b2c/me",
    updateprofile: 'v1/auth/b2c/me/edit',
    orderlist: 'v1/orders/get-order-list',
    addresslist: "v1/u-address/get-all-add/b2c",
    deleteaddress: 'v1/u-address/delete-address/b2c/'
}