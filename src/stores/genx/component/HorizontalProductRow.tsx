import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native'
import React, { FC, useCallback, useEffect, useMemo } from 'react'
import { FlashList } from '@shopify/flash-list';
import ProductCard from './ProductCard';
import { useScaledDimensions } from '../../../shared/hooks/useScaledDimensions';
import { colors } from '../../../shared/constants/colors';
import { SCREEN_WIDTH } from '../../../shared/constants/dimensions';
import { images } from '../../../shared/constants/images';
import { fonts } from '../../../shared/constants/fonts';

interface HorizontalProductRowInterface {
    data?: Array<any>,
    loading?: boolean
}

const HorizontalProductRow: FC<HorizontalProductRowInterface> = ({
    data = [],
    loading = false
}) => {
    const { width } = useScaledDimensions()
    const ITEM_WIDTH = useMemo(() => width / 2.5, [width]);


    useEffect(() => {
        // console.log('HorizontalProductRow rendered');
    }, [])

    const renderItem = useCallback(({ item, index }: any) => {
        return (
            <ProductCard
                data={item}
            />
        );
    }, []);

    const separator = useCallback(() => {
        return (
            <View style={styles.separator} />
        )
    }, [])

    if (!data?.length) {
        return (
            <View style={[styles.loaderContainer, styles.noProductContainer]}>
                <Image
                    source={images.noproduct}
                    style={styles.noproductimg}
                    resizeMode='contain'
                />
                <Text allowFontScaling={false} style={styles.label}>Oops!!!</Text>
            </View>
        )
    }
    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size={'small'} color={colors.black} />
            </View>
        )
    }
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
            horizontal
            contentContainerStyle={styles.container}
            style={styles.listStyle}
            ItemSeparatorComponent={separator}
            initialNumToRender={2}
            maxToRenderPerBatch={4}
            windowSize={4}
            showsHorizontalScrollIndicator={false}
            getItemLayout={(data, index) => ({
                length: ITEM_WIDTH,
                offset: ITEM_WIDTH * index,
                index,
            })}
        />
    )
}

export default React.memo(HorizontalProductRow)

const styles = StyleSheet.create({
    container: {
    },
    listStyle: {
        marginTop: 15,
    },
    separator: {
        marginRight: 10
    },
    noProductContainer: {
        backgroundColor: colors.grey22,
        borderRadius: 12,
        marginTop: 15
    },
    noproductimg: {
        width: 100,
        height: 100,
    },
    loaderContainer: {
        width: '100%',
        height: SCREEN_WIDTH / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.black
    }
})