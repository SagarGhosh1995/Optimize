import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native'
import React from 'react'
import { fonts } from '../../../../../shared/constants/fonts'
import { colors } from '../../../../../shared/constants/colors'
import CacheImage from '../../../../../shared/component/CacheImage'
import { icons } from '../../../../../shared/constants/icons'
import { menus } from '../../../../../shared/constants/profilemenu'
import useAuthenticated from '../../../../../shared/hooks/useAuthenticated'
import { useNavigation } from '@react-navigation/native'
import { getCurrentAppVersion } from '../../../../../shared/constants/appversion'
import { isIOS } from '../../../../../shared/constants/dimensions'

const ProfileMenus = () => {
    const navigation = useNavigation<any>()
    const isAuthenticated = useAuthenticated()

    return (
        <View style={styles.container}>
            {
                menus.map((item, index) =>
                    <View style={styles.menuContainer} key={index + '#'}>
                        <Text style={styles.heading}>{item.title}</Text>
                        <View style={{ backgroundColor: colors.white, paddingHorizontal: 15, borderRadius: 8 }}>
                            {
                                item.menu.map((itm: any, idx: number) =>
                                    <TouchableOpacity style={[styles.menuCard, ((idx + 1) === item.menu.length) && { borderBottomWidth: 0 }]} key={idx + 1 + ''} onPress={itm.onPress}>
                                        <Image source={itm.icon} style={styles.icons} />
                                        <View style={{ flex: 1, marginLeft: 10 }}>
                                            <Text style={styles.title}>{itm?.heading}</Text>
                                            <Text style={styles.subtitle}>{itm?.subtitle}</Text>
                                        </View>
                                        <Image source={icons.right} style={[styles.icons]} />
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
                )
            }
            {
                (isAuthenticated) &&
                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://www.21genx.com/user/delete')}>
                    <Image source={icons.delete} style={styles.icons} />
                    <Text style={[styles.title, styles.redTitle]}>Delete Your Account</Text>
                </TouchableOpacity>
            }
            {
                isAuthenticated &&
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('logout')}>
                    <Image source={icons.logout} style={styles.icons} />
                    <Text style={[styles.title, styles.redTitle]}>Logout</Text>
                </TouchableOpacity>
            }
            <View style={styles.versionContainer}>
                <Text style={styles.version}>
                    Version: {
                        getCurrentAppVersion().version_code
                    }
                </Text>
                <Text style={styles.version}>
                    Version Name: {
                        getCurrentAppVersion().version_name
                    }
                </Text>
            </View>
        </View>
    )
}

export default ProfileMenus


const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        paddingBottom: 30
    },
    menuContainer: {
        paddingVertical: 10,
    },
    heading: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: colors.grey26,
        marginBottom: 15
    },
    menuCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomColor: colors.grey24,
        borderBottomWidth: 1
    },
    icons: {
        width: 20,
        height: 20
    },
    title: {
        fontFamily: fonts.semiBold,
        fontSize: 14,
        color: colors.black
    },
    subtitle: {
        fontFamily: fonts.regular,
        fontSize: 10,
        color: colors.grey23
    },
    redTitle: {
        marginLeft: 10,
        color: colors.red2
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
        borderRadius: 8,
        marginTop: 15
    },
    versionContainer: {
        marginTop: 15,
        alignItems: 'flex-end'
    },
    version: {
        fontFamily: fonts.regular,
        fontSize: 10,
        color: colors.black
    }
})