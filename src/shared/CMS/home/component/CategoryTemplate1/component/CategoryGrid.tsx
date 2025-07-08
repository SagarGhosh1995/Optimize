import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { FC, memo, useEffect, useMemo } from 'react'
import CacheImage from '../../../../../component/CacheImage'
import { useImageAspectRatio } from '../../../../../hooks/useImageAspectRatio'

interface CategoryGridInterface {
    data?: any,
    onPressCategory?: (id: string) => void
}

const CategoryGrid: FC<CategoryGridInterface> = ({
    data,
    onPressCategory
}) => {

    const img1 = data?.[0]?.image ?? null
    const img2 = data?.[1]?.image ?? null
    const img3 = data?.[2]?.image ?? null
    const img4 = data?.[3]?.image ?? null
    const img5 = data?.[4]?.image ?? null

    const aspectRatio1 = useImageAspectRatio(img1);
    const aspectRatio2 = useImageAspectRatio(img2);
    const aspectRatio3 = useImageAspectRatio(img3);
    const aspectRatio4 = useImageAspectRatio(img4);
    const aspectRatio5 = useImageAspectRatio(img5);


    const handlePress = (id: string | undefined) => {
        if (id) onPressCategory?.(id);
    };

    if (data.length < 5) return null;
    return (
        <View style={styles.container}>
            <View style={[styles.row]}>
                <View style={styles.flex1}>
                    <TouchableOpacity
                        style={[styles.grid1, { aspectRatio: aspectRatio1 }]}
                        onPress={() => handlePress(data?.[0]?._id)}>
                        <CacheImage uri={data?.[0]?.image} style={styles.img} resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.grid1, styles.gridSpacing, { aspectRatio: aspectRatio2 }]}
                        onPress={() => handlePress(data[1]?._id)}>
                        <CacheImage uri={data?.[1]?.image} style={styles.img} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
                <View style={styles.flex2}>
                    <TouchableOpacity
                        style={[styles.grid2, { aspectRatio: aspectRatio3 }]}
                        onPress={() => handlePress(data[2]?._id)}>
                        <CacheImage uri={data?.[2]?.image} style={styles.img} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.row, styles.gridSpacing]}>
                <View style={styles.flex1}>
                    <TouchableOpacity
                        style={[styles.grid3, { aspectRatio: aspectRatio4 }]}
                        onPress={() => handlePress(data[3]?._id)}>
                        <CacheImage uri={data?.[3]?.image} style={styles.img} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
                <View style={[styles.flex1, styles.alignRight]}>
                    <TouchableOpacity
                        style={[styles.grid3, { aspectRatio: aspectRatio5 }]}
                        onPress={() => handlePress(data[4]?._id)}>
                        <CacheImage uri={data?.[4]?.image} style={styles.img} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default memo(CategoryGrid)

const styles = StyleSheet.create({
    container: {
        marginTop: 25
    },
    row: {
        flexDirection: 'row'
    },
    flex1: {
        flex: 1,
    },
    flex2: {
        flex: 2,
    },
    alignRight: {
        alignItems: 'flex-end',
    },
    gridSpacing: {
        marginTop: 5,
    },
    grid1: {
        width: '96%',
        borderRadius: 8,
        overflow: 'hidden'
    },
    grid2: {
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden'
    },
    grid3: {
        width: '98.5%',
        borderRadius: 8,
        overflow: 'hidden'
    },
    img: {
        width: '100%',
        height: '100%',
        alignSelf: 'center'
    }
})