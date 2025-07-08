import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect, useMemo } from 'react'
import CacheImage from '../../../../../component/CacheImage'
import { colors } from '../../../../../constants/colors'
import { useScaledDimensions } from '../../../../../hooks/useScaledDimensions'
import { useImageAspectRatio } from '../../../../../hooks/useImageAspectRatio'
import { fonts } from '../../../../../constants/fonts'

interface UtilityBlockInterface {
    data?: any | null
}

const UtilityBlock: FC<UtilityBlockInterface> = ({
    data
}) => {

    const { width } = useScaledDimensions()
    const GRID_SIZE = (width - 60) / 3

    const image = useMemo(() => {
        return (
            data?.image ??
            null
        );
    }, [data]);
    const aspectRatio = useImageAspectRatio(image) || 1;

    if (!data) return null
    return (
        <View style={styles.container} >
            <View style={[styles.imageContainer, { aspectRatio }]}>
                <CacheImage
                    uri={image}
                    style={styles.image}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.labelContainer}>
                <Text allowFontScaling={false} style={styles.label} numberOfLines={1}>{data?.name}</Text>
            </View>
        </View>
    )
}

export default React.memo(UtilityBlock)

const styles = StyleSheet.create({
    container: {

    },
    imageContainer: {
        width: '100%',
        backgroundColor: colors.black,
        borderRadius: 8,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    labelContainer: {
        justifyContent: 'center',
    },
    label: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.white,
        textAlign: 'center',
        marginTop: 10
    }
})