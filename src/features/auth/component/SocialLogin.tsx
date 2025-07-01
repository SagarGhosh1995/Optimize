import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ViewStyle } from 'react-native';
import { images } from '../../../shared/constants/images';
import { isIOS } from '../../../shared/constants/dimensions';
import { colors } from '../../../shared/constants/colors';
import { fonts } from '../../../shared/constants/fonts';

interface SocialLoginInterface {
  heading?: string;
  containerStyle?: ViewStyle;
  onSuccessLogin?: () => void;
}

const SocialLogin: FC<SocialLoginInterface> = ({
  heading,
  containerStyle,
  onSuccessLogin,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {heading && <Text style={styles.heading}>{heading}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={onSuccessLogin}
        accessible
        accessibilityLabel="Login with Google"
      >
        <Image source={images.google} style={styles.icon} resizeMode="cover" />
        <Text style={styles.label}>Sign in with Google</Text>
      </TouchableOpacity>

      {isIOS && (
        <TouchableOpacity
          style={[styles.button, styles.appleButton]}
          onPress={onSuccessLogin}
          accessible
          accessibilityLabel="Login with Apple"
        >
          <Image source={images.apple} style={styles.iconApple} resizeMode="cover" />
          <Text style={styles.label}>Sign in with Apple</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  heading: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.grey26,
    textAlign: 'center',
    marginBottom: 12,
  },
  button: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.grey25,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  appleButton: {
    marginTop: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconApple: {
    width: 30,
    height: 30,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.black,
    marginLeft: 15,
  },
});
