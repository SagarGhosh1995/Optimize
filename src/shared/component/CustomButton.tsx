import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { FC } from 'react'
import { fonts } from '../constants/fonts'
import { colors } from '../constants/colors'

interface CustomButtonInterface {
  containerStyle?: any,
  label?: string,
  headingStyle?: any,
  onPress?: () => void,
  icon?: any,
  disabled?: boolean,
  isLoading?: boolean,
  loaderColor?: string
}

const CustomButton: FC<CustomButtonInterface> = ({
  containerStyle,
  headingStyle,
  label,
  onPress,
  icon,
  disabled = false,
  isLoading = false,
  loaderColor = colors.white
}) => {
  return (
    <TouchableOpacity style={[styles.container, containerStyle, disabled && {backgroundColor: colors.transparentBlack}]} onPress={onPress} disabled={disabled}>

      {
        isLoading ? (
          <ActivityIndicator color={loaderColor} />
        )
          :
          (
            <>
              {
                icon && icon
              }
              <Text style={[styles.heading, headingStyle]}>{label}</Text>
            </>
          )
      }
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    height: 35,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  heading: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.white
  }
})