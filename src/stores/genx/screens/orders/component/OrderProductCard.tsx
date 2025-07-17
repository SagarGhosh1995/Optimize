import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { FC, useState } from 'react';
import CacheImage from '../../../../../shared/component/CacheImage';
import { colors } from '../../../../../shared/constants/colors';
import { fonts } from '../../../../../shared/constants/fonts';
import { icons } from '../../../../../shared/constants/icons';

interface OrderProductCardInterface {
    containerStyle?: any;
    data?: any;
    showCheckbox?: boolean;
    onPressCheckbox?: (isChecked?: boolean) => void;
}

const DEFAULT_IMAGE =
    'https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg';

const OrderProductCard: FC<OrderProductCardInterface> = ({
    data,
    containerStyle,
    showCheckbox = false,
    onPressCheckbox,
}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxToggle = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        onPressCheckbox?.(newState);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {showCheckbox && (
                <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckboxToggle}>
                    <Image
                        source={isChecked ? icons.checkboxactive : icons.checkboxinactive}
                        style={styles.checkboxIcon}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            )}

            <CacheImage
                uri={data?.main_img || DEFAULT_IMAGE}
                style={styles.productImg}
                resizeMode="contain"
            />

            <View style={styles.infoContainer}>
                {!!data?.brand_name && <Text style={styles.value}>{data.brand_name}</Text>}
                {!!data?.item_name && (
                    <Text style={styles.label} numberOfLines={1}>
                        {data.item_name}
                    </Text>
                )}

                <View style={styles.rowBetween}>
                    <Text style={styles.label}>
                        Qty:
                        <Text style={styles.value}> {data?.order_qty ?? 1}</Text>
                    </Text>
                    <Text style={styles.label}>
                        MRP Price:
                        <Text style={styles.value}> ₹{data?.list_price ?? 1235}</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default React.memo(OrderProductCard);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    checkboxContainer: {
        paddingRight: 8,
        justifyContent: 'center',
    },
    checkboxIcon: {
        width: 25,
        height: 25,
    },
    productImg: {
        width: 65,
        height: 67,
        borderRadius: 8,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 8,
        justifyContent: 'space-evenly',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontFamily: fonts.bold,
        color: colors.black,
        fontSize: 12,
    },
    value: {
        fontFamily: fonts.regular,
        color: colors.black,
        fontSize: 12,
    },
});
