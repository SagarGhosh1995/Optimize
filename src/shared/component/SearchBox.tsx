import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { FC, memo } from 'react'
import { colors } from '../constants/colors'
import { icons } from '../constants/icons'
import CustomIconInput from './CustomIconInput'
import { fonts } from '../constants/fonts'

const PLACEHOLDER  = 'Search with product, category...'

interface SearchBoxInterface {
    showInput?: boolean
}

const SearchBox:FC<SearchBoxInterface> = ({
    showInput
}) => {

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.6}>
            {
                showInput ?
               ( <CustomIconInput
                    leftIcon={icons.search}
                    placeholder={PLACEHOLDER }
                    keyboardType="default"
                    inputStyle={styles.input}
                    inputContainerStyle={styles.inputContainer}
                />)
                :
               ( <View style={styles.box}>
                    <Image source={icons.search} style={styles.icon} />
                    <Text allowFontScaling={false} style={styles.label}>{PLACEHOLDER }</Text>
                </View>)
            }
        </TouchableOpacity>
    )
}

export default memo(SearchBox)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'center'
    },
    inputContainer: {
        borderWidth: 0,
        backgroundColor: colors.bgcolor,
    },
    input: {
        height: 40
    },
    box:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.bgcolor,
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 10
    },
    icon: {
        width: 20,
        height: 20
    },
    label:{
        fontFamily: fonts.regular,
        fontSize: 12,
        color: colors.grey28,
        marginLeft: 10
    }
})