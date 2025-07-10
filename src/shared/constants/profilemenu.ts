import { navigate } from "../../app/navigation/NavigationHelper";
import useAuthenticated from "../hooks/useAuthenticated";
import { icons } from "./icons";

const isLoggedIn = () => {
    return useAuthenticated()
}

export const menus = [
        {
            title: 'Orders & Wishlist',
            menu: [
                {
                    heading: 'Orders',
                    subtitle: 'View and track recent orders',
                    icon: icons.solarboxlinear,
                    // onPress: () => isLoggedIn() ? navigate('orders') : _openAuthModal()
                },
                // {
                //     heading: "Pre-Book Orders",
                //     subtitle: "View and track recent pre book orders",
                //     icon: icons.solarboxlinear,
                //     onPress: () => isLoggedIn ? navigation.navigate("prebookorders") : _openAuthModal()
                // },
                {
                    heading: 'Wishlist',
                    subtitle: 'Represents saving favourites.',
                    icon: icons.heart,
                    // onPress: () => isLoggedIn() ? navigate('wishlist') : _openAuthModal()
                },
                {
                    heading: 'Address',
                    subtitle: 'View your saved addresses.',
                    icon: icons.location,
                    // onPress: () => isLoggedIn() ? navigate('address') : _openAuthModal()
                },
                {
                    heading: 'History',
                    subtitle: 'Symbolizes viewing or browsing.',
                    icon: icons.clockthin,
                    // onPress: () => isLoggedIn() ? navigate('history') : _openAuthModal()
                }
            ]
        },
        {
            title: 'Payment & Credits',
            menu: [
                // {
                //     heading: "GenX Credit",
                //     subtitle: "Check your credit balance.",
                //     icon: icons.creditcard,
                //     onPress: () => navigation.navigate("credit")
                // },
                {
                    heading: 'GenX Wallet',
                    subtitle: 'View wallet balance and history.',
                    icon: icons.wallet,
                    // onPress: () => isLoggedIn() ? navigate('wallet') : _openAuthModal()
                },
                {
                    heading: 'Payment Options',
                    subtitle: 'Manage saved payment methods.',
                    icon: icons.cash,
                    // onPress: () => isLoggedIn() ? navigate('paymentpage') : _openAuthModal()
                }
            ]
        },
        {
            title: 'Returns & Support',
            menu: [
                {
                    heading: 'Contact Us',
                    subtitle: 'Reach customer support.',
                    icon: icons.support,
                    // onPress: () => navigate('contact')
                }
            ]
        },
        {
            title: 'Policies & Legal',
            menu: [
                {
                    heading: 'Cancellation and Refund',
                    subtitle: 'Cancelled orders and track refunds.',
                    icon: icons.refund,
                    // onPress: () => navigate('policy', { type: 'cancellation' })
                },
                {
                    heading: 'Privacy Policy',
                    subtitle: 'How we handle your data.',
                    icon: icons.lock,
                    // onPress: () => navigate('policy', { type: 'privacy' })
                },
                {
                    heading: 'Terms of Use',
                    subtitle: 'Service terms and conditions.',
                    icon: icons.file,
                    // onPress: () => navigate('policy', { type: 'terms' })
                },
                {
                    heading: 'Warranty Policy',
                    subtitle: 'Product warranty info.',
                    icon: icons.shield,
                    // onPress: () => navigate('policy', { type: 'warranty' })

                },
                {
                    heading: 'Shipping Policy',
                    subtitle: 'Delivery details and rates.',
                    icon: icons.truck,
                    // onPress: () => navigate('policy', { type: 'shipping' })
                }
            ]
        },
        {
            title: 'FAQ',
            menu: [
                {
                    heading: 'FAQ',
                    subtitle: 'Frequently Asked Questions',
                    icon: icons.truck,
                    // onPress: () => navigate('faq')
                }
            ]
        }
    ]