import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC } from 'react'
import { images } from '../constants/images'
import { fonts } from '../constants/fonts'
import { colors } from '../constants/colors'
import CustomButton from './CustomButton'
import { useNavigation } from '@react-navigation/native'

interface EmptyContentInterface {
    type?: 'wishlist' | 'address'
}

const EmptyContent: FC<EmptyContentInterface> = ({
    type
}) => {

    const navigation = useNavigation<any>()

    if (type === 'wishlist') {
        return (
            <View style={[styles.container, styles.flex1, styles.itemCenter, styles.justifyCenter]}>
                <Image
                    source={images.emptywishlist}
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text style={styles.heading} allowFontScaling={false}>Oops! Wishlist is Empty</Text>
                <Text style={styles.text} allowFontScaling={false}>
                    Start exploring and add your favorite products to your wishlist!
                </Text>
            </View>
        )
    }

    if (type === 'address') {
        return (
            <View style={[styles.container, styles.flex1, styles.itemCenter, styles.justifyCenter]}>
                <Image
                    source={images.noaddress}
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text style={styles.heading} allowFontScaling={false}>No Address Found</Text>
                <Text style={styles.text} allowFontScaling={false}>
                    Add a delivery address to proceed with your order.
                </Text>
                <CustomButton label='Add New Address' containerStyle={styles.addressBtn} onPress={()=> navigation.navigate('editaddress')} />
            </View>
        )
    }
}

export default React.memo(EmptyContent)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15
    },
    flex1: {
        flex: 1,
    },
    itemCenter: {
        alignItems: 'center'
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    image: {
        width: '50%',
        height: '30%',
        alignSelf: 'center',
    },
    heading: {
        fontFamily: fonts.bold,
        fontSize: 20,
        color: colors.grey23,
        marginTop: 10,
        textAlign: 'center',
    },
    text: {
        fontFamily: fonts.regular,
        fontSize: 16,
        color: colors.grey17,
        textAlign: 'center',
        marginTop: 6,
    },
    addressBtn: {
        width: '40%',
        marginTop: 20
    }
})