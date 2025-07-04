import { View, Text } from 'react-native'
import React, { FC } from 'react'

interface BrandTemplate1Interface {
    data?: any
}

const BrandTemplate1: FC<BrandTemplate1Interface> = ({
    data
}) => {
    return (
        <View>
            <Text>BrandTemplate1</Text>
        </View>
    )
}

export default BrandTemplate1