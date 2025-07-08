import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC } from 'react'
import { images } from '../constants/images'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/dimensions'
import { fonts } from '../constants/fonts'
import { colors } from '../constants/colors'

interface EmptyContentInterface {
    type?: 'wishlist'
}

const EmptyContent: FC<EmptyContentInterface> = ({
    type
}) => {
    // const 

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
}

export default React.memo(EmptyContent)

const styles = StyleSheet.create({
    container: {
       paddingHorizontal: 15
    },
    flex1:{
        flex: 1,
    },
    itemCenter:{
        alignItems: 'center'
    },
    justifyCenter:{
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
})