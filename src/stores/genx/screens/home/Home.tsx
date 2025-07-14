/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, FlatList, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { colors } from '../../../../shared/constants/colors'
import AppHeader from '../../../../shared/component/AppHeader'
import { homePageBanner, homePageCMS, homePageRandomProduct } from './homeApi'
import { warn } from '../../../../shared/utils/log'
import SearchBox from '../../../../shared/component/SearchBox'
import ParallaxSlider from '../../../../shared/component/ParallaxSlider'
import { useScaledDimensions } from '../../../../shared/hooks/useScaledDimensions'
import CMS from '../../../../shared/CMS/CMS'
import VerticleProducts from '../product/component/VerticleProducts'

const Home = () => {

  const scaledSize = useScaledDimensions()
  const [banner, setBanner] = useState<Array<any>>([]);
  const [cms, setCms] = useState<Array<any>>([]);
  const [products, setProducts] = useState<Array<any>>([]);


  const loadHomePage = useCallback(async () => {
    try {
      const [bannerRes, cmsRes, randomRes] = await Promise.allSettled([
        homePageBanner('?title=Top Section'),
        homePageCMS(),
        homePageRandomProduct()
      ]);

      if (bannerRes.status === 'fulfilled') {
        const slides = bannerRes.value?.data?.response?.[0]?.slider_images ?? [];
        if (Array.isArray(slides) && !!slides.length) {
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
        if (Array.isArray(allproducts) && !!allproducts.length) {
          setProducts(allproducts);
        } else {
          warn('Invalid Product format: NOT_AN_ARRAY');
        }
      }
    } catch (error) {
      warn('Unexpected error in loadHomePage:', error);
    }
  }, [])

  const sections: Array<any> = useMemo(() => {
    const list = [];
    if (banner.length) {
      list.push({ id: 'banner', type: 'banner', data: banner });
    }
    if (cms.length) {
      list.push({ id: 'cms', type: 'cms', data: cms })
    }
    if (products.length) {
      list.push({ id: 'random-product', type: 'random-product', data: products })
    }
    return list;
  }, [banner, cms, products]);

  const renderHeader = useCallback(() => (
    <>
      <AppHeader showLogo showNotification showCart />
      <SearchBox />
    </>
  ), []);

  useEffect(() => {
    loadHomePage()
  }, [])

  const renderSection = useCallback(({ item }: { item: any }) => {
    switch (item.type) {
      case 'banner':
        return (
          <ParallaxSlider
            data={item.data}
          />
        );
      case 'cms':
        return <CMS data={item.data} />;
      case 'random-product':
        return(
          <VerticleProducts 
            products={products}            
          />
        )

      default:
        return null;
    }
  }, [scaledSize.width, products])

  return (
    <View style={styles.container} >
      {
        renderHeader()
      }
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id + ''}
        renderItem={renderSection}
        contentContainerStyle={styles.flatlistContainer}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgcolor,
  },
  flatlistContainer: {
    flexGrow: 1,
    paddingBottom: 50
  }
})