import { View, Text } from 'react-native'
import React, { FC } from 'react'

interface HeroSectionInterface {
    data?: any
}

const HeroSection: FC<HeroSectionInterface> = ({
    data
}) => {
    return (
        <View>
            <Text>HeroSection</Text>
        </View>
    )
}

export default HeroSection