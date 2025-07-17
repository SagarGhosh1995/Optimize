import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useScaledDimensions } from '../../../../../hooks/useScaledDimensions'
import { colors } from '../../../../../constants/colors'
import { useImageAspectRatio } from '../../../../../hooks/useImageAspectRatio'
import CacheImage from '../../../../../component/CacheImage'

interface HorizontalBrandRowInterface {
    data?: Array<any>,
    onPressBrand?: (index: number) => void
}

const HorizontalBrandRow: FC<HorizontalBrandRowInterface> = ({
    data = [],
    onPressBrand
}) => {

    const { width } = useScaledDimensions()
    const ITEM_WIDTH = useMemo(() => width / 6.5, [width]);

    const imgUri = data?.[0]?.image ?? null
    const aspectRatio = useImageAspectRatio(imgUri) || 1

    const [activeIndex, setActiveIndex] = useState<number>(0)


    const handleBrandPress = useCallback((item: any, index: number) => {
        setActiveIndex(index)
        onPressBrand && onPressBrand(item)
    }, [activeIndex])


    const renderItem = useCallback(({ item, index }: any) => {
        const isActive = activeIndex === index
        return (
            <TouchableOpacity style={[{ width: isActive ? ITEM_WIDTH + 10 : ITEM_WIDTH, height: isActive ? ITEM_WIDTH + 10 : ITEM_WIDTH }]} onPress={() => handleBrandPress(item, index)}>
                <View style={[styles.imageContainer, { aspectRatio }]}>
                    <CacheImage
                        uri={item?.image}
                        style={styles.image}
                    />
                </View>
            </TouchableOpacity>
        )
    }, [activeIndex])

    const separator = useCallback(() => {
        return (
            <View style={styles.separator} />
        )
    }, [])

    if (!data?.length) return null
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
                length: ITEM_WIDTH,
                offset: ITEM_WIDTH * index,
                index,
            })}
        />
    )
}

export default React.memo(HorizontalBrandRow)
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center'
    },
    flatlistStyle: {
        marginTop: 15
    },
    imageContainer: {
        width: '100%',
        borderRadius: 12,
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
    }
})