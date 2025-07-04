import { View, Text } from 'react-native'
import React, { FC } from 'react'

interface AwardTemplate1Interface {
    data?: any
}

const AwardTemplate1: FC<AwardTemplate1Interface> = ({
    data
}) => {
    return (
        <View>
            <Text>AwardTemplate1</Text>
        </View>
    )
}

export default AwardTemplate1