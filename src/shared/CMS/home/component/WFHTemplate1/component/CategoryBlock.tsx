import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect, useMemo } from 'react'
import { useImageAspectRatio } from '../../../../../hooks/useImageAspectRatio';
import { useScaledDimensions } from '../../../../../hooks/useScaledDimensions';
import CacheImage from '../../../../../component/CacheImage';
import { fonts } from '../../../../../constants/fonts';
import { colors } from '../../../../../constants/colors';

interface CategoryBlockInterface {
    data?: any | null
}

const CategoryBlock: FC<CategoryBlockInterface> = ({
    data = null
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
            <CacheImage
                uri={image}
                style={styles.image}
                resizeMode='cover'
            />
            <View style={styles.labelContainer}>
                <Text allowFontScaling={false} style={styles.label} numberOfLines={1}>{data?.name}</Text>
            </View>
        </View>
    )
}

export default React.memo(CategoryBlock)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
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
        position: 'absolute',
        zIndex: 9,
        bottom: 0,
        width: '100%',
        height: 26,
        justifyContent: 'center',
        backgroundColor: colors.transparentWhite,
    },
    label: {
        fontFamily: fonts.medium,
        fontSize: 10,
        color: colors.black,
        textAlign: 'center'
    }
})