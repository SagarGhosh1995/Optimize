/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import useAuthenticated from '../../shared/hooks/useAuthenticated'
import { images } from '../../shared/constants/images'
import { colors } from '../../shared/constants/colors'
import { getAllWishlistIds } from '../../stores/genx/screens/wishlist/wishlistApi'

const Splash = () => {

  const isAuthenticated = useAuthenticated()

  useEffect(() => {
    const load = async () => {
      try {
        const [wishlistRes] = await Promise.all([
          getAllWishlistIds(), // 👈 no await here
        ]);
        // console.log('splash result', wishlistRes);
      } catch (err) {
        console.error('Error loading wishlist:', err);
      }
    };

    if (isAuthenticated) {
      load();
    }
  }, [isAuthenticated])


  return (
    <View style={styles.container}>
      <Image
        source={images.splash}
        style={styles.image}
        resizeMode='contain'
      />
    </View>
  )
}

export default React.memo(Splash)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgcolor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '60%',
    height: '10%',
  }
})