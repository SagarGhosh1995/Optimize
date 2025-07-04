import { View, Text } from 'react-native'
import React, { FC } from 'react'

interface CountryTemplate1Interface {
    data?: any
}

const CountryTemplate1: FC<CountryTemplate1Interface> = () => {
    return (
        <View>
            <Text>CountryTemplate1</Text>
        </View>
    )
}

export default CountryTemplate1