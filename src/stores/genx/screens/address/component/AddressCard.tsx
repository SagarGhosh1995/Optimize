/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { FC, useCallback, useState } from 'react'
import { colors } from '../../../../../shared/constants/colors';
import { icons } from '../../../../../shared/constants/icons';
import { fonts } from '../../../../../shared/constants/fonts';
import CustomButton from '../../../../../shared/component/CustomButton';
import { deleteUserAddress } from '../addressApi';

interface AddressCardInterface {
    data?: {
        [key: string]: any
    } | null;
    isSelected: boolean;
    showEdit?: boolean;
    onSelect: () => void;
}

const AddressCard: FC<AddressCardInterface> = ({
    data = null,
    isSelected = false,
    showEdit = false,
    onSelect
}) => {
    const [delLoading, setDelLoading] = useState(false)

    const onDelete = useCallback(() => {
        setDelLoading(true)
        deleteUserAddress(data?._id).finally(() => {
        }).finally(() => setDelLoading(false))
    }, [])

    if (!data) return null
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={onSelect}>
                        <Image source={isSelected ? icons.radioactive : icons.radioinactive} resizeMode='contain' style={styles.radio} />
                    </TouchableOpacity>
                    <Text style={styles.name} numberOfLines={1}>{data?.name}</Text>
                    <View style={[styles.addressType, data?.addressType === "Home" && { backgroundColor: colors.blue5 }]}>
                        <Text style={styles.typeLabel}>{data?.addressType}</Text>
                    </View>
                </View>
                {
                    showEdit &&
                    <TouchableOpacity>
                        <Image source={icons.pencilfill} style={styles.pencilIcon} resizeMode='contain' />
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.body}>
                <Text style={[styles.btext]}>{data?.house_address}, {data?.area_address}, {data?.landmark}, {data?.city}</Text>
                <Text style={[styles.btext, styles.mt_5]}>{data?.state}: {data?.pincode}</Text>
                <Text style={[styles.btext, styles.mt_5]}>{data?.mobile}</Text>
            </View>

            {
                isSelected &&
                <View style={[styles.row, styles.mt_15]}>
                    <CustomButton
                        label='Delivery Here'
                        containerStyle={styles.deliveryBtn}
                    />
                    <TouchableOpacity style={styles.deleteBtn} onPress={onDelete} disabled={delLoading} >
                        {
                            delLoading ?
                                <ActivityIndicator size={'small'} color={colors.black} />
                                :
                                <Image source={icons.trash} style={styles.trash} />
                        }
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default React.memo(AddressCard, (prev, next) =>
    prev.isSelected === next.isSelected && prev.data === next.data
);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 8
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mt_5: {
        marginTop: 5
    },
    mt_15: {
        marginTop: 15
    },
    radio: {
        width: 20,
        height: 20,
        // backgroundColor: 'pink'
    },
    name: {
        maxWidth: 200,
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.black,
        textTransform: 'capitalize',
        marginLeft: 10
    },
    addressType: {
        width: 45,
        height: 19,
        borderRadius: 4,
        backgroundColor: colors.yellow4,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    typeLabel: {
        fontFamily: fonts.regular,
        fontSize: 10,
        color: colors.black
    },
    pencilIcon: {
        width: 25,
        height: 25,
    },
    body: {
        marginTop: 10
    },
    btext: {
        fontFamily: fonts.regular,
        fontSize: 12,
        color: colors.black
    },
    deliveryBtn: {
        width: '40%'
    },
    deleteBtn: {
        marginLeft: 15
    },
    trash: {
        width: 28,
        height: 28
    }
})