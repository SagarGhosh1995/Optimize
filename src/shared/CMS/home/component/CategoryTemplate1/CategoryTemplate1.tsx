/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { log } from '../../../../utils/log'
import Heading from '../../../../component/Heading'
import { getFilteredData, getRandomProduct } from '../../../cmsApi'
import CategoryGrid from './component/CategoryGrid'
import HorizontalProductRow from '../../../../../stores/genx/component/HorizontalProductRow'
import { colors } from '../../../../constants/colors'
import { SCREEN_WIDTH } from '../../../../constants/dimensions'

interface CategoryTemplate1Interface {
    data?: {
        section_name?: string;
        [key: string]: any;
    }
}

const CategoryTemplate1: FC<CategoryTemplate1Interface> = ({
    data
}) => {

    const [category, setCategory] = useState<Array<any>>([])
    const [selectedCategory, setSelectedCategory] = useState<null | string>(null)
    const [products, setProducts] = useState<Array<any>>([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getParentCategory()
    }, [data])

    useEffect(() => {
        if (selectedCategory !== '') { getProducts() }
    }, [selectedCategory])

    const getParentCategory = () => {
        let ids = data?.data?.ids?.map((item: any) => item?.id).join('","')
        ids = '["' + ids + '"]'
        if (!data?.section_name) return
        getFilteredData(data?.section_name, ids).then(res => {
            if (res?.success) {
                setCategory(res?.data?.response?.data ?? [])
                setSelectedCategory(res?.data?.response?.data?.[0]?._id)
            }
        })
    }

    const getProducts = async () => {

        if (!selectedCategory) return
        setLoading(true)
        getRandomProduct('parent_category_id', selectedCategory).then(res => {
            if (res?.success) {
                setProducts(res?.data?.productList ?? [])
            }
        }).finally(() => setLoading(false))
    }

    if (!data) return null

    return (
        <View style={styles.container}>
            <Heading heading={data?.data?.sub_heading} subHeading={data?.data?.heading} />
            {
                !!category.length &&
                <CategoryGrid data={category} onPressCategory={setSelectedCategory} />
            }
            {
                !!products.length &&
                <HorizontalProductRow
                    data={products}
                    loading={loading}
                />
            }
        </View>
    )
}

export default React.memo(CategoryTemplate1)

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 15
    },
})