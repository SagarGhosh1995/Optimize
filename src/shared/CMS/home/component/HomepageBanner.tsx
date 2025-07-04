import { View, Text } from 'react-native'
import React, { FC } from 'react'

interface HomepageBannerInterface {
    data?: any
}

const HomepageBanner: FC<HomepageBannerInterface> = ({
    data
}) => {
    return (
        <View>
            <Text>HomepageBanner</Text>
        </View>
    )
}

export default HomepageBanner