import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { useImageAspectRatio } from '../../../../../hooks/useImageAspectRatio'
import CacheImage from '../../../../../component/CacheImage'

interface ProductGridInterface {
  loading?: boolean,
  data?: Array<any>
}

const ProductGrid: FC<ProductGridInterface> = ({
  data,
  loading
}) => {

  /**
   *  Option 1 -
   *  1000 x 400
   *  500 x 350
   * 
   *  Option 2 -
   *  800 x 500
   *  400 x 350
   */

  const img1 = 'https://setaswall.com/wp-content/uploads/2017/12/Computer-Tech-Wallpaper-19-800x500.jpg' // data?.[0]?.product_images?.main_img ?? null
  const img2 = require('../../../../../../assets/t1.jpg') // data?.[1]?.product_images?.main_img ?? null
  const img3 = data?.[2]?.product_images?.main_img ?? null
  const img4 = data?.[3]?.product_images?.main_img ?? null


  const aspectRatio1 = useImageAspectRatio(img1);
  const aspectRatio2 = useImageAspectRatio(img2);
  const aspectRatio3 = useImageAspectRatio(require('../../../../../../assets/tst.png'));
  const aspectRatio4 = useImageAspectRatio(require('../../../../../../assets/tst2.png'));

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.grid1, { aspectRatio: aspectRatio1, }]}>
          <CacheImage uri={img1} style={styles.image} resizeMode='contain' />
        </View>
        <View style={[styles.grid2, { aspectRatio: aspectRatio2, }]}>
          {/* <CacheImage uri={img2} style={styles.image} resizeMode='contain' /> */}
          <Image source={img2} style={styles.image} resizeMode='contain' />
        </View>
      </View>
      <View style={[styles.row, { marginTop: 10 }]}>
        <View style={[styles.grid2, { aspectRatio: aspectRatio2, }]}>
          {/* <CacheImage uri={img2} style={styles.image} resizeMode='contain' /> */}
          <Image source={img2} style={styles.image} resizeMode='contain' />
        </View>
        <View style={[styles.grid1, { aspectRatio: aspectRatio1, }]}>
          <CacheImage uri={img1} style={styles.image} resizeMode='contain' />
        </View>
      </View>
    </View>
  )
}

export default React.memo(ProductGrid)

const styles = StyleSheet.create({
  container: {
    marginTop: 15
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  grid1: {
    width: "57%",
    // height: 100,
    backgroundColor: 'pink',
    borderRadius: 8,
    overflow: 'hidden'
  },
  grid2: {
    width: "40%",
    borderRadius: 8,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    height: "100%",
    alignItems: 'center'
  }
})