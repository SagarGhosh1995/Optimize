import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import AppHeader from '../../../../shared/component/AppHeader'
import { colors } from '../../../../shared/constants/colors'
import ProfileHeader from './component/ProfileHeader'
import ProfileMenus from './component/ProfileMenus'


const Profile = () => {
  return (
    <View style={styles.container}>
      <AppHeader showBack showNotification showCart title="My Profile" />
      <ScrollView contentContainerStyle={styles.content}>
        <ProfileHeader />
        <ProfileMenus />
      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgcolor
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    // backgroundColor:'red'
  }
})