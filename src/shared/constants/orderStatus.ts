import { icons } from "./icons";

export const order_status = [
    {
        label: 'Order Pending',
        value: 'pending',
        icon: icons.clockgreen,
    },
    {
        label: 'Placed',
        value: 'order_placed',
        icon: icons.greentick,
    },
    {
        label: 'In Progress',
        value: 'processing',
        icon: icons.clockgreen,
    },
    {
        label: 'Out For Delivery',
        value: 'out_for_delivery',
        icon: icons.shipping,
    },
    {
        label: 'Delivered',
        value: 'delivered',
        icon: icons.greentick,
    },
    {
        label: 'Cancelled',
        value: 'cancelled',
        icon: icons.cross2,
    },
    {
        label: 'Request Cancelled',
        value: 'cancel_request',
        icon: icons.cross2,
    },
    {
        label: 'Shipped',
        value: 'shipped',
        icon: icons.shippingtick,
    },
    {
        label: 'Order Returned',
        value: 'returned',
        icon: icons.boxduotone,
    },
    {
        label: 'Return Requested',
        value: 'return_request',
        icon: icons.boxreturn,
    },
    {
        label: 'Return Picked Up',
        value: 'return_picked_up',
        icon: icons.boxgreentick,
    },
];