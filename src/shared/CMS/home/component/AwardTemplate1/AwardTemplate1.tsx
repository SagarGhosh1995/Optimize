import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useCallback, useEffect, useState } from 'react'
import Heading from '../../../../component/Heading'
import HorizontalAwardRow from './component/HorizontalAwardRow'
import { getFilteredData, getRandomProduct } from '../../../cmsApi'
import HorizontalProductRow from '../../../../../stores/genx/component/HorizontalProductRow'

interface AwardTemplate1Interface {
    data?: any
}

const AwardTemplate1: FC<AwardTemplate1Interface> = ({
    data
}) => {

    const [awards, setAwards] = useState<Array<any>>([])
    const [selectedAwards, setSelectedAwards] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<Array<any>>([])

    useEffect(() => {
        getAwards()
    }, [])

    const getAwards = () => {
        if (!data?.data?.ids?.length) return
        let ids = data?.data?.ids?.map((item: any) => item?.id).join('","')
        ids = '["' + ids + '"]'
        getFilteredData(data?.section_name, ids).then(res => {
            if (res?.success) {
                setAwards(res?.data?.response?.data ?? [])
                setSelectedAwards(res?.data?.response?.data?.[0])
            }
        }).catch(err => {
        })
    }

    const onSelectAward = useCallback((brand: any) => {
        setSelectedAwards(brand)
    }, [])

    useEffect(() => {
        if (!selectedAwards?._id) return;
        setLoading(true);
        getRandomProduct('awards', selectedAwards._id)
            .then((res) => {
                if (res?.success) {
                    setProducts(res?.data?.productList ?? []);
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [selectedAwards]);

    if (!data) return null
    return (
        <View style={styles.container}>
            <Heading heading={data?.data?.sub_heading} subHeading={data?.data?.heading} />
            {
                (!!awards.length) &&
                <HorizontalAwardRow
                    data={awards}
                    onPressBrand={onSelectAward}
                />
            }
            {
                (!!products.length) &&
                <HorizontalProductRow
                    data={products}
                    loading={loading}
                />
            }
        </View>
    )
}

export default AwardTemplate1

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        paddingHorizontal: 15
    },
})