import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { FC, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';

import OrderProductCard from './OrderProductCard';
import CustomButton from '../../../../../shared/component/CustomButton';
import { colors } from '../../../../../shared/constants/colors';
import { fonts } from '../../../../../shared/constants/fonts';
import { order_status } from '../../../../../shared/constants/orderStatus';
import { icons } from '../../../../../shared/constants/icons';

interface OrderProductListCardInterface {
    data?: any;
    showShadow?: boolean;
    showfooterBtn?: boolean;
    containerStyle?: any;
    isPreBookOrder?: boolean;
}

const OrderProductListCard: FC<OrderProductListCardInterface> = ({
    data,
    showShadow = true,
    showfooterBtn = true,
    containerStyle,
    isPreBookOrder = true
}) => {
    const navigation = useNavigation<any>();

    const orderStatus = useMemo(() => {
        return order_status.find((item) => item?.value === data?.order_status);
    }, [data?.order_status]);

    const orderItems = useMemo(() => {
        return [...(data?.order_details || []), ...(data?.orders || [])];
    }, [data]);

    if (!data) return null;

    const dynamicStyles = getDynamicStyles(data?.payment_method);

    return (
        <View
            style={[
                styles.container,
                containerStyle,
                showShadow && styles.shadow
            ]}
        >
            <View style={styles.header}>
                {orderStatus?.icon && (
                    <Image source={orderStatus.icon} style={styles.statusIcon} />
                )}

                <View style={styles.headerTextContainer}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.status}>{orderStatus?.label ?? ''}</Text>
                        {data?.payment_method && (
                            <View style={[styles.methodView, dynamicStyles.methodBg]}>
                                <Text style={styles.method}>{data.payment_method}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.orderInfoRow}>
                        <TouchableOpacity
                            style={styles.orderIdRow}
                            onPress={() => Clipboard.setString(data.user_order_id)}
                        >
                            <Text style={styles.labelGrey}>Order Id:</Text>
                            <Text style={styles.orderIdValue} adjustsFontSizeToFit numberOfLines={1}>
                                #{data.user_order_id}
                            </Text>
                            <Image source={icons.copy} style={styles.copyIcon} />
                        </TouchableOpacity>

                        <Text style={styles.priceText}>
                            Price:
                            <Text style={styles.valueText}> ₹{data.total_price ?? data.total_amount}</Text>
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.body}>
                {orderItems.map((item: any, idx: number) => (
                    <OrderProductCard
                        data={item}
                        key={idx}
                        containerStyle={idx > 0 ? styles.productCardSpacing : undefined}
                    />
                ))}
            </View>

            {showfooterBtn && (
                <View style={styles.footer}>
                    <CustomButton
                        label="See Details"
                        containerStyle={styles.seeDetailsButton}
                        onPress={() =>
                            navigation.navigate(
                                isPreBookOrder ? 'prebookorderdetails' : 'orderdetails',
                                { order_id: data.user_order_id }
                            )
                        }
                    />
                </View>
            )}
        </View>
    );
};

export default React.memo(OrderProductListCard, (prev, next) => {
    return prev.data?.user_order_id === next.data?.user_order_id &&
        prev.showShadow === next.showShadow &&
        prev.showfooterBtn === next.showfooterBtn
})

const getDynamicStyles = (paymentMethod: string) =>
    StyleSheet.create({
        methodBg: {
            backgroundColor: paymentMethod === 'cash' ? colors.red1 : colors.green2,
        },
    });

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingVertical: 10,
        paddingBottom: 20,
    },
    shadow: {

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
        borderBottomColor: colors.grey24,
        borderBottomWidth: 1,
    },
    statusIcon: {
        width: 20,
        height: 20,
        alignSelf: 'flex-start',
    },
    headerTextContainer: {
        flex: 1,
        paddingLeft: 4,
    },
    status: {
        fontFamily: fonts.bold,
        color: colors.black,
        fontSize: 13,
        textTransform: 'capitalize',
    },
    methodView: {
        paddingHorizontal: 10,
        borderRadius: 8,
        justifyContent: 'center',
    },
    method: {
        fontFamily: fonts.bold,
        color: colors.white,
        fontSize: 10,
        textTransform: 'uppercase',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    orderIdRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.7,
    },
    labelGrey: {
        fontFamily: fonts.bold,
        color: colors.grey23,
        fontSize: 11,
        marginRight: 4,
    },
    orderIdValue: {
        fontFamily: fonts.regular,
        color: colors.black,
        fontSize: 11,
        flex: 1,
    },
    copyIcon: {
        width: 12,
        height: 12,
        marginHorizontal: 5,
    },
    priceText: {
        fontFamily: fonts.bold,
        color: colors.black,
        fontSize: 11,
        flex: 0.3,
        textAlign: 'right',
    },
    valueText: {
        fontFamily: fonts.regular,
        color: colors.black,
        fontSize: 11,
    },
    body: {
        marginTop: 15,
    },
    productCardSpacing: {
        marginTop: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    seeDetailsButton: {
        marginLeft: 10,
    },
});
