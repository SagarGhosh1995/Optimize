import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { FC, useCallback, useMemo } from 'react'
import Heading from '../../../shared/component/Heading'
import ProductCard from './ProductCard'
import { fonts } from '../../../shared/constants/fonts'
import { colors } from '../../../shared/constants/colors'

interface VerticleProductsInterface {
    products?: Array<any>
}

const VerticleProducts: FC<VerticleProductsInterface> = ({
    products = []
}) => {

    const ITEM_HEIGHT = 250;

    const renderItem = useCallback(({ item, index }: { item: any, index: number }) => {
        return (
            <ProductCard
                data={item}
                cardDividingRatio={2.33}
                fixedAspectRatio={1}
            />
        )
    }, [])

    const keyExtractor = useCallback(
        (item: any, index: number) => item?._id?.toString?.() ?? index.toString(),
        []
    );

    const emptyComponent = useMemo(
        () => (
            <View style={styles.emptyContainer}>
                <Text allowFontScaling={false} style={styles.emptyText}>No products found.</Text>
            </View>
        ),
        []
    );

    const footerComponent = useCallback(() => {
        return (
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.footerButton}>
                    <Text allowFontScaling={false} style={styles.footerLabel}>Discover More</Text>
                </TouchableOpacity>
            </View>
        )
    }, [products?.length])

    return (
        <View style={styles.container}>
            <Heading
                heading="Explore show-stopping products"
                subHeading="DISCOVER LUXURY REDEFINED"
            />
            <FlatList
                data={products}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapperStyle}
                contentContainerStyle={styles.listContainerStyle}
                style={styles.listStyle}
                ListEmptyComponent={emptyComponent}
                ListFooterComponent={footerComponent}
                initialNumToRender={6}
                maxToRenderPerBatch={4}
                windowSize={4}
                removeClippedSubviews={true}
                getItemLayout={(data, index) => {
                    const row = Math.floor(index / 2); // because 2 columns
                    return {
                        length: ITEM_HEIGHT,
                        offset: ITEM_HEIGHT * row,
                        index,
                    };
                }}
            />
        </View>
    )
}

export default React.memo(VerticleProducts);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: 30
    },
    listStyle: {
        marginTop: 25,
    },
    listContainerStyle: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    columnWrapperStyle: {
        justifyContent: 'space-around'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontFamily: fonts.regular,
        fontSize: 16,
        color: colors.black,
    },
    footerContainer: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerButton: {
        paddingVertical: 10,
    },
    footerLabel: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.black,
        textDecorationLine: 'underline'
    }
})