import { View, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors } from '../../../../shared/constants/colors'
import AppHeader from '../../../../shared/component/AppHeader'
import { homePageBanner, homePageCMS, homePageRandomProduct } from './homeApi'
import { warn } from '../../../../shared/utils/log'
import SearchBox from '../../../../shared/component/SearchBox'
import ParallaxSlider from '../../../../shared/component/ParallaxSlider'
import { ScaledDimensions } from '../../../../shared/hooks/ScaledDimensions'
import HomeCms from '../../../../shared/CMS/home/HomeCms'
import CMS from '../../../../shared/CMS/CMS'

const Home = () => {

  const scaledSize = ScaledDimensions()
  const [banner, setBanner] = useState<Array<any>>([])
  const [cms, setCms] = useState<Array<any>>([])
  const [products, setProducts] = useState<Array<any>>([])


  const loadHomePage = useCallback(async () => {
    try {
      const [bannerRes, cmsRes, randomRes] = await Promise.allSettled([
        homePageBanner('?title=Top Section'),
        homePageCMS(),
        homePageRandomProduct()
      ]);

      if (bannerRes.status === 'fulfilled') {
        const slides = bannerRes.value?.data?.response?.[0]?.slider_images ?? [];
        if (Array.isArray(slides)) {
          setBanner(slides);
        } else {
          warn('Invalid banner format: NOT_AN_ARRAY');
        }
      } else {
        warn('Banner API error:', bannerRes.reason);
      }

      if (cmsRes.status === 'fulfilled') {
        const allcms = cmsRes.value?.data?.response?.data ?? [];
        if (Array.isArray(allcms)) {
          setCms(allcms);
        } else {
          warn('Invalid CMS format: NOT_AN_ARRAY');
        }
      } else {
        warn('CMS API error:', cmsRes.reason);
      }

      if (randomRes.status === 'fulfilled') {
        const allproducts = randomRes?.value?.data?.productList ?? []
        if (Array.isArray(allproducts)) {
          setProducts(allproducts);
        } else {
          warn('Invalid Product format: NOT_AN_ARRAY');
        }
      }

    } catch (error) {
      warn('Unexpected error in loadHomePage:', error);
    }
  }, [])

  useEffect(() => {
    loadHomePage()
  }, [])


  return (
    <View style={styles.container}>
      <AppHeader showLogo showNotification showCart />
      <SearchBox />
      <FlatList
        data={[]}
        keyExtractor={(_, index) => index + ''}
        ListHeaderComponent={() => (
          <>
            <ParallaxSlider
              // autoPlay
              data={banner}
              bannerWidth={scaledSize.width}
            />
            <CMS
              type='home'
              data={cms}
            />
          </>
        )}
      />
      {/* <ScrollView contentContainerStyle={styles.content}>
        <ParallaxSlider
          // autoPlay
          data={banner}
          bannerWidth={scaledSize.width}
        />
        <CMS
          type='home'
          data={cms}
        />
      </ScrollView> */}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgcolor,
  },
  content: {
    flexGrow: 1,

  }
})