import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../../globalRedux/useTypedHooks'
import { colors } from '../../../../../shared/constants/colors'
import CacheImage from '../../../../../shared/component/CacheImage'
import { checkImageURL } from '../../../../../shared/utils/imageTools'
import { images } from '../../../../../shared/constants/images'
import { useImageAspectRatio } from '../../../../../shared/hooks/useImageAspectRatio'
import { fonts } from '../../../../../shared/constants/fonts'
import { icons } from '../../../../../shared/constants/icons'
import { useNavigation } from '@react-navigation/native'

const ProfileHeader = () => {

  const navigation = useNavigation()
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

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={typeof avatar === 'number'}>
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
      <TouchableOpacity style={styles.button}>
        <Image source={icons.penciledit} style={styles.icon} />
      </TouchableOpacity>
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