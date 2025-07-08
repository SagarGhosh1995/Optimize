import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect, useMemo } from 'react'
import ParallaxSlider from '../../../../component/ParallaxSlider';

interface HeroSectionInterface {
    data?: any
}

const HeroSection: FC<HeroSectionInterface> = ({
    data
}) => {


    if (!data) return null

    const sliders = useMemo(() => {
        return data?.data?.slider_images
    }, [data])

    return (
        <View style={styles.container}>
            <ParallaxSlider
                data={sliders}
                resizeMode='stretch'
            />
        </View>
    )
}

export default HeroSection

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    }
})