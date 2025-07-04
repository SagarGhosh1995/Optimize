import { View, Text } from 'react-native'
import React, { FC } from 'react'

interface WFHTemplate1Interface {
    data?: any
}

const WFHTemplate1: FC<WFHTemplate1Interface> = ({
    data
}) => {
    return (
        <View>
            <Text>WFHTemplate1</Text>
        </View>
    )
}

export default WFHTemplate1