import { View, Text } from 'react-native'
import React, { FC } from 'react'

interface ProductCmsInterface {
    data?: Array<any>
}

const ProductCms: FC<ProductCmsInterface> = ({
    data
}) => {


    if (data?.length === 0) return null
    return (
        <View>
            <Text>ProductCms</Text>
        </View>
    )
}

export default ProductCms