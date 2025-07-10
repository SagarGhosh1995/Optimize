import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { colors } from '../shared/constants/colors'
import { images } from '../shared/constants/images'
import { useAppSelector } from '../globalRedux/useTypedHooks'
import useAuthenticated from '../shared/hooks/useAuthenticated'

const Splash = () => {

  const isAuthenticated = useAuthenticated()


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

export default Splash

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