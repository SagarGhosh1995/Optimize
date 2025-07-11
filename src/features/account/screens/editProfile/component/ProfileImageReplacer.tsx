

import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import CacheImage from '../../../../../shared/component/CacheImage'
import { icons } from '../../../../../shared/constants/icons'
import ImagePicker from 'react-native-image-crop-picker';
import { warn } from '../../../../../shared/utils/log'
import useProfileImageUrlChecker from '../../../../../shared/hooks/useProfileImageUrlChecker'
import { colors } from '../../../../../shared/constants/colors'

interface ProfileImageReplacerInterface {
    onChange?: (uri: string | null) => void
}

const ProfileImageReplacer: FC<ProfileImageReplacerInterface> = ({
    onChange
}) => {

    const image = useProfileImageUrlChecker()
    const [avatar, setAvatar] = useState<string | null | number>(image)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setAvatar(image)
    }, [image])

    const pickImage = () => {
        setLoading(true)
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            includeBase64: true
        }).then((res: any) => {
            setAvatar(res?.path)
            onChange && onChange(`data:${res.mime};base64,${res?.data}`)
        }).catch(err => {
            warn("Profile Image selection => ", err);
        }).finally(() => setLoading(false))
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {
                    loading ?
                        <ActivityIndicator size={'small'} color={colors.black} />
                        :
                        <>
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
                            <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
                                <Image
                                    source={icons.cameralinear}
                                    resizeMode="contain"
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </>
                }
            </View>
        </View>
    )
}

export default React.memo(ProfileImageReplacer)

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        justifyContent: 'center',
        backgroundColor: colors.grey22
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 100 / 2
    },
    iconButton: {
        position: 'absolute',
        zIndex: 9,
        bottom: 5,
        right: -0
    },
    icon: {
        width: 30,
        height: 30,
    },
})