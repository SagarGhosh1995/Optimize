import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useCallback, useEffect, useState } from 'react'
import Heading from '../../../../component/Heading'
import { getFilteredData, getRandomProduct } from '../../../cmsApi'
import HorizontalProductRow from '../../../../../stores/genx/screens/product/component/HorizontalProductRow'
import HorizontalCountryRow from './component/HorizontalCountryRow'

interface CountryTemplate1Interface {
    data?: any
}

const CountryTemplate1: FC<CountryTemplate1Interface> = ({
    data
}) => {
    const [country, setCountry] = useState<Array<any>>([])
    const [selectedCountry, setSelectedCountry] = useState<any>(null)
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
                setCountry(res?.data?.response?.data ?? [])
                setSelectedCountry(res?.data?.response?.data?.[0])
            }
        }).catch(err => {
        })
    }

    const onSelectCountry = useCallback((country: any) => {
        setSelectedCountry(country)
    }, [])

    useEffect(() => {
        if (!selectedCountry?._id) return;
        setLoading(true);
        getRandomProduct('country_id', selectedCountry._id)
            .then((res) => {
                if (res?.success) {
                    setProducts(res?.data?.productList ?? []);
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [selectedCountry]);

    if (!data) return null
    return (
        <View style={styles.container}>
            <Heading heading={data?.data?.sub_heading} subHeading={data?.data?.heading} />
            {
                !!country.length &&
                <HorizontalCountryRow
                    data={country}
                    onPressCountry={onSelectCountry}
                />
            }
            {
                // (!!products.length) &&
                <HorizontalProductRow
                    data={products}
                    loading={loading}
                />
            }
        </View>
    )
}

export default CountryTemplate1

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        paddingHorizontal: 15
    }
})

