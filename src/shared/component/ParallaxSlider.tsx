/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet } from 'react-native'
import React, { FC, useCallback, useEffect, useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';
import CacheImage from './CacheImage';
import { colors } from '../constants/colors';
import { useImageAspectRatio } from '../hooks/useImageAspectRatio';
import { ResizeMode } from '@d11/react-native-fast-image';

interface ParallaxSliderInterface {
    autoPlay?: boolean,
    containerStyle?: any,
    resizeMode?: ResizeMode;
    data?: Array<{ image?: string; mob_image_url?: string }>,
    bannerHeight?: number | undefined,
    bannerWidth?: number | undefined
}

const ParallaxSlider: FC<ParallaxSliderInterface> = ({
    autoPlay,
    containerStyle,
    data = [],
    bannerHeight,
    bannerWidth,
    resizeMode = 'cover'
}) => {

    const [viewSize, setViewSize] = useState({ width: 10, height: 10 });

    const handleLayout = (event: { nativeEvent: { layout: { width: any; height: any; }; }; }) => {
        const { width, height } = event.nativeEvent.layout;
        setViewSize({ width, height });
    };

    const imageUri = data?.[0]?.image || data?.[0]?.mob_image_url;
    const aspectRatio = useImageAspectRatio(imageUri);
    const isTooTall = aspectRatio > 1.2;
    const adjustedRatio = isTooTall ? 9 / 16 : aspectRatio;

    const actualWidth = bannerWidth ?? viewSize.width;
    const maxBannerHeight = 300;

    const actualHeight =
        bannerHeight ?? Math.min(actualWidth * adjustedRatio, maxBannerHeight);

    const isReady = actualWidth > 10 && actualHeight > 10;

    const renderItem = useCallback(({ item }: any) => (
        <View style={[styles.card]}>
            <CacheImage
                uri={item?.image ?? item?.mob_image_url}
                style={[styles.image]}
                resizeMode={resizeMode}
            />
        </View>
    ), [resizeMode]);


    if (!data?.length) { return null }
    return (
        <View onLayout={handleLayout} style={[styles.container, containerStyle]}>
            {isReady && (
                <Carousel
                    autoPlay={autoPlay}
                    width={actualWidth}
                    height={actualHeight}
                    data={data}
                    scrollAnimationDuration={3000}
                    renderItem={renderItem}
                    pagingEnabled
                    snapEnabled
                    mode="parallax"
                    modeConfig={{
                        parallaxAdjacentItemScale: 0.5,
                        parallaxScrollingScale: 0.93,
                        parallaxScrollingOffset: 10,
                    }}
                />
            )}
        </View>
    )
}

export default React.memo(ParallaxSlider)

const styles = StyleSheet.create({
    container: {
    
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