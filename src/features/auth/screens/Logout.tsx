/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { fonts } from '../../../shared/constants/fonts'
import { colors } from '../../../shared/constants/colors'
import { logout } from '../authApi'
import { useStoreId } from '../../../globalContext/hooks'


const Logout = () => {
  const storeId = useStoreId()

  useEffect(() => {
    logout(storeId)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Siging Out...</Text>
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.black
  }
})