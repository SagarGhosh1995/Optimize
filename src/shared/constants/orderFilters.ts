import { icons } from "./icons";

export const order_filter_menu = [
    {
        title: 'All',
        slug: 'all',
        tag: 'all',
        icon: icons.shop,
    },
    {
        title: 'On Transit',
        slug: 'status=shipped',
        tag: 'shipped',
        icon: icons.truck,
    },
    {
        title: 'Received',
        slug: 'status=delivered',
        tag: 'delivered',
        icon: icons.boxoutline,
    },
    {
        title: 'Cancelled',
        slug: 'status=cancelled',
        tag: 'cancelled',
        icon: icons.cancelcircle,
    },
];