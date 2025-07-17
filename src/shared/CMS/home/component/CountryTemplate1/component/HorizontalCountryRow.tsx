import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useScaledDimensions } from '../../../../../hooks/useScaledDimensions'
import { useImageAspectRatio } from '../../../../../hooks/useImageAspectRatio'
import CacheImage from '../../../../../component/CacheImage'
import { colors } from '../../../../../constants/colors'
import { fonts } from '../../../../../constants/fonts'

interface HorizontalCountryRowInterface {
    data: Array<any>,
    onPressCountry: (data: any) => void
}


const HorizontalCountryRow: FC<HorizontalCountryRowInterface> = ({
    data = [],
    onPressCountry
}) => {

    const { width, height } = useScaledDimensions()
    const ITEM_WIDTH = useMemo(() => ((width / 6.8)), [width]);
    const ITEM_HEIGHT = useMemo(() => ((height / 10.8)), [height]);

    const [activeIndex, setActiveIndex] = useState<number>(0)

    const handlePress = useCallback((item: any, index: number) => {
        setActiveIndex(index)
        onPressCountry && onPressCountry(item)
    }, [activeIndex])

    const renderItem = useCallback(({ item, index }: any) => {
        const isActive = activeIndex === index
        return (
            <TouchableOpacity style={[{
                width: isActive ? ITEM_WIDTH + 10 : ITEM_WIDTH,
                height: isActive ? ITEM_HEIGHT + 10 : ITEM_HEIGHT
            }]} onPress={() => handlePress(item, index)}>
                <View style={[styles.imageContainer]}>
                    <CacheImage
                        uri={item?.country_banner}
                        style={styles.image}
                        resizeMode='cover'
                    />
                    <View style={styles.labelContainer}>
                        <Text style={styles.label} numberOfLines={1} allowFontScaling={false}>{item?.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }, [activeIndex])

    const separator = useCallback(() => {
        return (
            <View style={styles.separator} />
        )
    }, [])

    if (!data.length) return null
    return (
        <FlatList
            data={data}
            horizontal
            keyExtractor={(item, index) => item?._id ?? index + ""}
            renderItem={renderItem}
            style={styles.flatlistStyle}
            contentContainerStyle={styles.container}
            ItemSeparatorComponent={separator}
            initialNumToRender={5}
            maxToRenderPerBatch={4}
            windowSize={4}
            getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
            })}
        />
    )
}

export default React.memo(HorizontalCountryRow)

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
    },
    flatlistStyle: {
        marginTop: 15
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: colors.white,
    },
    image: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
    },
    separator: {
        marginRight: 10
    },
    labelContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.transparentBlack2
    },
    label: {
        fontFamily: fonts.bold,
        fontSize: 9,
        color: colors.white
    }
})