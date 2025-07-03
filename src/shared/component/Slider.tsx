import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useCallback } from 'react'
import Carousel from 'react-native-reanimated-carousel';
import { SCREEN_WIDTH } from '../constants/dimensions';
import CacheImage from './CacheImage';
import { ScaledDimensions } from '../hooks/ScaledDimensions';

interface SliderInterface {
    autoPlay?: boolean,
    containerStyle?: any,
    data?: Array<any>,
    bannerHeight?: number | undefined,
    bannerWidth?: number | undefined
}

const data = ['Slide 1', 'Slide 2', 'Slide 3'];

const Slider: FC<SliderInterface> = ({
    autoPlay,
    containerStyle,
    data = [],
    bannerHeight,
    bannerWidth
}) => {
    const { width } = ScaledDimensions();

    const renderItem = useCallback(({ item }: any) => (
        <View style={styles.card}>
            <CacheImage
                uri={item?.image}
                style={styles.image}
                resizeMode='cover'
            />
        </View>
    ), [data]);

    if (data.length === 0) { return null }
    return (
        <View style={[styles.container, containerStyle]}>
            <Carousel
                autoPlay={autoPlay}
                width={bannerWidth ?? width - 30}
                height={bannerHeight ?? width * 9 / 16}
                data={data}
                scrollAnimationDuration={3000}
                renderItem={renderItem}
            />
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({
    container: {

    },
    card: {
        width: '100%',
        height: '100%', // ensures child gets Carousel's fixed height
        borderRadius: 8,
        backgroundColor: '#ddd',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    }
})