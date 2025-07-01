import React from 'react';
import Toast, { ToastConfig, ToastPosition } from 'react-native-toast-message';
import { Image, StyleSheet, Text, View } from 'react-native';

import { icons } from '../constants/icons';
import { fonts } from '../constants/fonts';
import { colors } from '../constants/colors';

// Toast config used in <Toast config={toastConfig} />
export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      text1NumberOfLines={2}
      style={styles.successStyle}
      contentContainerStyle={styles.toastContent}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
      renderLeadingIcon={() => (
        <Image
          source={icons.greentick}
          style={styles.iconSuccess}
          resizeMode="contain"
        />
      )}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={2}
      style={styles.errorStyle}
      contentContainerStyle={styles.toastContent}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
      renderLeadingIcon={() => (
        <Image
          source={icons.cross2}
          style={styles.iconError}
          resizeMode="contain"
          tintColor={colors.white}
        />
      )}
    />
  ),

  warning: ({ text1, text2 }) => (
    <View style={styles.warningContainer}>
      <Image
        source={icons.warning}
        style={styles.iconWarning}
        resizeMode="contain"
      />
      <View style={styles.warningTextContainer}>
        <Text style={styles.warningText1} numberOfLines={1}>
          {text1}
        </Text>
        {text2 ? (
          <Text style={styles.warningText2} numberOfLines={1}>
            {text2}
          </Text>
        ) : null}
      </View>
    </View>
  ),
};

// Call this to show toast
export const showToast = (
  type: 'success' | 'error' | 'warning' = 'success',
  text1 = 'Hello',
  text2 = '',
  position: ToastPosition = 'bottom'
) => {
  Toast.show({
    type,
    text1,
    text2,
    position,
    visibilityTime: 2000,
  });
};

// Import BaseToast and ErrorToast as components (not as types!)
import { BaseToast, ErrorToast } from 'react-native-toast-message';

const styles = StyleSheet.create({
  toastContent: {
    paddingLeft: 5,
  },
  toastText1: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.white,
  },
  toastText2: {
    fontFamily: fonts.regular,
    fontSize: 9,
    color: colors.white,
    marginTop: 2,
  },
  successStyle: {
    height: 44,
    width: '90%',
    backgroundColor: colors.black,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    borderLeftWidth: 0,
  },
  errorStyle: {
    backgroundColor: colors.red1,
    width: '90%',
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    borderColor: colors.red2,
  },
  warningContainer: {
    height: 60,
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.redish,
  },
  warningTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  warningText1: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.white,
  },
  warningText2: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.white,
  },
  iconSuccess: {
    width: 24,
    height: 24,
  },
  iconError: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  iconWarning: {
    width: 25,
    height: 25,
  },
});
