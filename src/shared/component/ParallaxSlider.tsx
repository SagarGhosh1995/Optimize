/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet } from 'react-native'
import React, { FC, useCallback, useEffect, useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';
import CacheImage from './CacheImage';
import { colors } from '../constants/colors';
import { log } from '../utils/log';

interface ParallaxSliderInterface {
    autoPlay?: boolean,
    containerStyle?: any,
    data?: Array<any>,
    bannerHeight?: number | undefined,
    bannerWidth?: number | undefined
}

const ParallaxSlider: FC<ParallaxSliderInterface> = ({
    autoPlay,
    containerStyle,
    data = [],
    bannerHeight,
    bannerWidth
}) => {


    const [viewSize, setViewSize] = useState({ width: 10, height: 10 });

    const handleLayout = (event: { nativeEvent: { layout: { width: any; height: any; }; }; }) => {
        const { width, height } = event.nativeEvent.layout;
        setViewSize({ width, height });
    };

    const renderItem = useCallback(({ item }: any) => (
        <View style={styles.card}>
            <CacheImage
                uri={item?.image}
                style={[styles.image]}
                resizeMode='cover'
            />
        </View>
    ), []);

    useEffect(() => {
        log('ParallaxSlider rendered');
    }, []);

    if (data.length === 0) { return null }
    return (
        <View onLayout={handleLayout} style={[styles.container, containerStyle]}>
            <Carousel
                autoPlay={autoPlay}
                width={bannerWidth ?? viewSize.width}
                height={bannerWidth ? bannerWidth * 9 / 16 : viewSize.width * 9 / 16}
                data={data}
                scrollAnimationDuration={3000}
                renderItem={renderItem}
                pagingEnabled={true}
                snapEnabled={true}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.93,
                    parallaxScrollingOffset: 10,
                }}
            />
        </View>
    )
}

export default React.memo(ParallaxSlider)

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red'
    },
    card: {
        width: '100%',
        height: '100%', // ensures child gets Carousel's fixed height
        borderRadius: 12,
        backgroundColor: colors.bgcolor,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    }
})