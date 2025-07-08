import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import { fonts } from '../../../shared/constants/fonts'

interface LoginOptionsInteface {
    onChooseMenu?: (menu: number) => void
}

const LoginOptions:FC<LoginOptionsInteface> = ({
    onChooseMenu
}) => {

    const [activeIndex, setActiveIndex] = useState(1)

    const onPressMenu = (index: number) => {
        setActiveIndex(index)
        onChooseMenu &&
        onChooseMenu(index)
    }

    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <TouchableOpacity style={[styles.menu, activeIndex === 1 && styles.activeMenu]} onPress={() => onPressMenu(1)}>
                    <Text allowFontScaling={false} style={[styles.menuTitle,activeIndex === 1 && {fontFamily: fonts.bold, color: colors.black}]}>Mobile</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={[styles.menu, activeIndex === 2 && styles.activeMenu]} onPress={() => onPressMenu(2)}>
                    <Text allowFontScaling={false} style={[styles.menuTitle,activeIndex === 2 && {fontFamily: fonts.bold, color: colors.black}]}>Email</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginOptions

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    menuContainer: {
        flexDirection: "row",
        height: 48,
        backgroundColor: colors.grey24,
        borderRadius: 8
    },
    menu:{
        flex: 1,
        margin: 5,
        borderRadius: 8,
        justifyContent: 'center'
    },
    activeMenu:{
        backgroundColor: colors.white,
    },
    menuTitle:{
        fontFamily: fonts.regular,
        fontSize: 14,
        color: colors.grey26,
        textAlign: 'center'
    }
})