import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import PhoneInput from 'react-native-international-phone-number'
import { colors } from '../../../shared/constants/colors'
import { fonts } from '../../../shared/constants/fonts'
import { icons } from '../../../shared/constants/icons'

interface InternationalPhoneInputInterface {
    onChangePhoneNumber?: (number: any) => void,
    disabled?: boolean,
    onPressEdit?: () => void,
    label?: string,
    containerStyle?: any,
    inputContainerStyle?: any
}

const InternationalPhoneInput: FC<InternationalPhoneInputInterface> = ({
    onChangePhoneNumber,
    disabled = false,
    onPressEdit,
    label,
    containerStyle,
    inputContainerStyle
}) => {
    const [value, setValue] = useState('')
    const [country, setCountry] = useState<any>(null)
    const [countryCode, setCountryCode] = useState('+91')


    const handleInputValue = (phoneNumber: string) => {
        setValue(phoneNumber)
        const number = (phoneNumber).replace(/\s/g, '')
        onChangePhoneNumber &&
            onChangePhoneNumber({ code: countryCode, number: number })
    }

    const handleSelectedCountry = (country: any) => {
        setCountry(country)
        setCountryCode(country.callingCode)
    }

    return (
        <View style={[styles.container, containerStyle]}>
            {
                label &&
                <Text style={styles.label}>{label}</Text>
            }
            <View style={[inputContainerStyle]}>
                <PhoneInput
                    value={value}
                    placeholder='Enter Mobile Number'
                    defaultCountry="IN"
                    disabled={disabled}
                    placeholderTextColor={colors.grey23}
                    onChangePhoneNumber={handleInputValue}
                    selectedCountry={country}
                    onChangeSelectedCountry={handleSelectedCountry}
                    phoneInputStyles={{
                        container: {
                            borderWidth: 0,
                            backgroundColor: colors.white,
                        },
                        divider: {
                            width: 0,
                        },
                        callingCode: {
                            fontFamily: fonts.regular,
                            fontSize: 14,
                            color: colors.black,
                            marginLeft: -15,
                            marginTop: 1
                        },
                        input: {
                            flex: 1,
                            fontFamily: fonts.regular,
                            fontSize: 14,
                            color: colors.black
                        },
                        flagContainer: {
                            backgroundColor: colors.white,
                            borderRightColor: colors.grey25,
                            borderRightWidth: 1
                        },
                        flag: {
                            // borderRadius: 50,
                            fontSize: 16,
                            // backgroundColor: 'red',
                            // overflow: 'hidden'
                        }
                    }}
                    modalStyles={{
                        searchInput: {
                            fontFamily: fonts.regular,
                            fontSize: 12,
                            color: colors.black,
                        },
                        callingCode: {
                            fontFamily: fonts.regular,
                            fontSize: 12,
                            color: colors.black,
                        },
                        countryName: {
                            fontFamily: fonts.regular,
                            fontSize: 12,
                            color: colors.black,
                        }
                    }}
                />
            </View>
            {
                disabled &&
                <TouchableOpacity style={styles.editButton} onPress={onPressEdit}>
                    <Image source={icons.penciledit} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
            }
        </View>
    )
}

export default InternationalPhoneInput

const styles = StyleSheet.create({
    container: {

    },
    label: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.black
    },
    editButton: {
        zIndex: 999,
        position: 'absolute',
        right: 0,
        top: 0,
        paddingHorizontal: 15,
        height: '100%',
        justifyContent: 'center'
    }
})