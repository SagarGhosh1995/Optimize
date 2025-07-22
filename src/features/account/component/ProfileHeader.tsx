/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import FullScapeImageViewModal from './FullScapeImageViewModal'
import { useAppSelector } from '../../../globalRedux/useTypedHooks'
import { checkImageURL } from '../../../shared/utils/imageTools'
import { images } from '../../../shared/constants/images'
import CacheImage from '../../../shared/component/CacheImage'
import { icons } from '../../../shared/constants/icons'
import { colors } from '../../../shared/constants/colors'
import { fonts } from '../../../shared/constants/fonts'

const ProfileHeader = () => {

  const navigation = useNavigation<any>()
  const [openImage, setOpenImage] = useState(false)
  const userdata = useAppSelector((state) => state?.user?.user)
  const [avatar, setAvatar] = useState<string | null | number>(null)

  useEffect(() => {
    checkProfileImageUrl()
  }, [userdata?.avatar])

  const checkProfileImageUrl = async () => {
    const res = await checkImageURL(userdata?.avatar ?? null)
    if (res) {
      setAvatar(userdata?.avatar ?? null)
    } else {
      setAvatar(images.emptydp)
    }
  }

  const handleImagePress = useCallback(() => {
    setOpenImage(!openImage)
  },[openImage])

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={typeof avatar === 'number'} onPress={handleImagePress}>
        {
          typeof avatar === 'string' ?
            <CacheImage
              uri={avatar}
              style={styles.avatar}
              resizeMode='cover'
            />
            :
            typeof avatar === 'number' &&
            <Image source={avatar} style={styles.avatar} resizeMode='cover' />
        }
      </TouchableOpacity>
      <View style={styles.details}>
        {
          userdata?.name &&
          <Text style={[styles.text]} numberOfLines={1} allowFontScaling={false}>{userdata?.name ?? "Your Name"}</Text>
        }
        {
          userdata?.email &&
          <Text style={[styles.text, styles.mail]} numberOfLines={1} allowFontScaling={false}>{userdata?.email ?? 'yourmail@mail.com'}</Text>
        }
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('editprofile')}>
        <Image source={icons.penciledit} style={styles.icon} />
      </TouchableOpacity>
      <FullScapeImageViewModal uri={avatar} isModalVisible={openImage} toggleModal={handleImagePress} />
    </View>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.black
  },
  mail: {
    fontFamily: fonts.regular,
    fontSize: 12,
    marginTop: 2
  },
  button: {
    padding: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
})