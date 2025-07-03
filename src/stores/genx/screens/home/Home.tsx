import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors } from '../../../../shared/constants/colors'
import AppHeader from '../../../../shared/component/AppHeader'
import { homePageBanner, homePageCMS, homePageRandomProduct } from './homeApi'
import { log, warn } from '../../../../shared/utils/log'
import SearchBox from '../../../../shared/component/SearchBox'
import Slider from '../../../../shared/component/Slider'

const Home = () => {

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
        const cms = cmsRes.value?.data?.response?.data ?? [];
        if (Array.isArray(cms)) {
          setCms(cms);
        } else {
          warn('Invalid CMS format: NOT_AN_ARRAY');
        }
      } else {
        warn('CMS API error:', cmsRes.reason);
      }

      if (randomRes.status === 'fulfilled') {
        const products = randomRes?.value?.data?.productList ?? []
        if (Array.isArray(products)) {
          setProducts(products);
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
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingHorizontal: 15}}>
      <Slider
      autoPlay
        data={banner}
        bannerHeight={275}
      />
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgcolor,
  }
})