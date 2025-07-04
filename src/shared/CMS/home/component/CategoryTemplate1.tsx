/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect } from 'react'
import { log } from '../../../utils/log'
import Heading from '../../../component/Heading'

interface CategoryTemplate1Interface {
    data?: any
}

const CategoryTemplate1: FC<CategoryTemplate1Interface> = ({
    data
}) => {

    useEffect(() => {
        log('CategoryTemplate1 rendered', data)
    }, [])

    return (
        <View style={styles.container}>
            <Heading heading={data?.data?.sub_heading} subHeading={data?.data?.heading} />
        </View>
    )
}

export default React.memo(CategoryTemplate1)

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    }
})