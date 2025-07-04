import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC, memo } from 'react'
import { images } from '../constants/images'
import { fonts } from '../constants/fonts'
import { colors } from '../constants/colors'
import { isIOS } from '../constants/dimensions'

interface HeadingInterface {
    swap?: boolean,
    heading?: string,
    subHeading?: string,
    constainerStyle?: any,
    tintColor?: string,
    headingStyle?: any,
    subHeadingStyle?: any
}

const Heading: FC<HeadingInterface> = ({
    swap,
    heading,
    subHeading,
    constainerStyle,
    tintColor,
    headingStyle,
    subHeadingStyle
}) => {
    return (
        <View style={[styles.container, constainerStyle]}>
            {
                heading &&
                <Text style={[swap ? styles.heading2 : styles.heading1, headingStyle]}>{heading}</Text>
            }
            {
                subHeading &&
                <Text style={[swap ? styles.heading1 : styles.heading2, subHeadingStyle]}>{subHeading}</Text>
            }
            <Image source={images.divider} style={[styles.divider]} tintColor={tintColor} />
        </View>
    )
}

export default memo(Heading)

const styles = StyleSheet.create({
    container: {

    },
    heading1: {
        fontFamily: fonts.regular,
        fontSize: 12,
        color: colors.black,
        textAlign: 'center',
        lineHeight: isIOS ? 20 : 16,
        maxWidth: '95%'
    },
    heading2: {
        fontFamily: fonts.bold,
        fontSize: 16,
        lineHeight: isIOS ? 23 : 16,
        color: colors.black,
        textAlign: 'center',
        marginTop: 5,
        textTransform: 'uppercase'
    },
    divider: {
        width: 150,
        height: 10,
        alignSelf: 'center',
        marginTop: 15,
    }
})