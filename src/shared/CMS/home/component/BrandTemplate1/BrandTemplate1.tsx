import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import Heading from '../../../../component/Heading'
import HorizontalBrandRow from './component/HorizontalBrandRow'
import { getFilteredData, getRandomProduct } from '../../../cmsApi'
import CacheImage from '../../../../component/CacheImage'
import { colors } from '../../../../constants/colors'
import { useImageAspectRatio } from '../../../../hooks/useImageAspectRatio'
import ProductGrid from './component/ProductGrid'

interface BrandTemplate1Interface {
    data?: any
}

const BrandTemplate1: FC<BrandTemplate1Interface> = ({
    data = null
}) => {

    const [brands, setBrands] = useState<Array<any>>([])
    const [selectedBrand, setSelectedBrand] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<Array<any>>([])


    useEffect(() => {
        getBrands()
    }, [])

    const getBrands = () => {
        if (!data?.data?.ids?.length) return
        let ids = data?.data?.ids?.map((item: any) => item?.id).join('","')
        ids = '["' + ids + '"]'
        getFilteredData(data?.section_name, ids).then(res => {
            if (res?.success) {
                setBrands(res?.data?.response?.data ?? [])
                setSelectedBrand(res?.data?.response?.data?.[0])
            }
        }).catch(err => {
        })
    }

    useEffect(() => {
        if (!selectedBrand?._id) return;
        setLoading(true);
        getRandomProduct('brand_id', selectedBrand._id)
            .then((res) => {
                if (res?.success) {
                    setProducts(res?.data?.productList ?? []);
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [selectedBrand]);

    const onSelectBrand = useCallback((brand: any) => {
        setSelectedBrand(brand)
    }, [])

    const banneruri = useMemo(() => {
        return selectedBrand?.app_brand_banner ?? selectedBrand?.brand_banner ?? null
    }, [selectedBrand])

    const aspectRatio = useImageAspectRatio(banneruri) || 1


    if (!data) return null
    return (
        <View style={styles.container}>
            <Heading heading={data?.data?.sub_heading} subHeading={data?.data?.heading} />

            {
                !!brands.length && <HorizontalBrandRow
                    data={brands}
                    onPressBrand={onSelectBrand}
                />}
            {
                (selectedBrand && banneruri) &&
                <TouchableOpacity style={[styles.brandBannerContainer, { aspectRatio }]}>
                    <CacheImage
                        uri={banneruri}
                        style={styles.banner}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            }
            {
                !!products.length &&
                <ProductGrid data={products} loading={loading} />
            }
        </View>
    )
}

export default BrandTemplate1

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 15
    },
    brandBannerContainer: {
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: colors.red1,
        marginTop: 10
    },
    banner: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    }
})