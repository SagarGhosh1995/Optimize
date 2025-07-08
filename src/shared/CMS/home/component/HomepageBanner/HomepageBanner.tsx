import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect } from 'react'
import CacheImage from '../../../../component/CacheImage';
import { useImageAspectRatio } from '../../../../hooks/useImageAspectRatio';

interface HomepageBannerInterface {
    data?: any | null
}

const HomepageBanner: FC<HomepageBannerInterface> = ({
    data = null
}) => {
    const image = data?.data?.mob_image ?? null
    const aspectRatio = useImageAspectRatio(image);

    if (!data) return null
    return (
        <View style={[styles.container]}>
            <View style={[styles.imageContainer, { aspectRatio: aspectRatio, }]}>
                <CacheImage
                    uri={image}
                    style={styles.image}
                    resizeMode='contain'
                />
            </View>
        </View>
    )
}

export default HomepageBanner

const styles = StyleSheet.create({
    container: {
        marginTop: 35,
        marginHorizontal: 15,
    },
    imageContainer: {
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    }
})