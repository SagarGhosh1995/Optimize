import { View, Text } from 'react-native'
import React, { FC } from 'react'

interface UtilityTemplate1Interface {
    data?: any
}

const UtilityTemplate1: FC<UtilityTemplate1Interface> = ({
    data
}) => {
    return (
        <View>
            <Text>UtilityTemplate1</Text>
        </View>
    )
}

export default UtilityTemplate1