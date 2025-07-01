import React, { FC, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import Timer from './Timer';
import { colors } from '../../../shared/constants/colors';
import { fonts } from '../../../shared/constants/fonts';

interface OtpInputInterface {
  onFillOTP?: (otp: string) => void;
  onPressResend?: () => void;
}

const CustomOtpInput: FC<OtpInputInterface> = ({
  onFillOTP,
  onPressResend,
}) => {
  const otpRef = useRef<any>(null);

  const handleOtpFilled = useCallback((text: string) => {
    Keyboard.dismiss();
    onFillOTP?.(text);
  }, [onFillOTP]);

  const handleResend = useCallback(() => {
    otpRef.current?.clear?.();
    onPressResend?.();
  }, [onPressResend]);

  return (
    <View style={styles.container}>
      <OtpInput
        ref={otpRef}
        numberOfDigits={6}
        focusColor={colors.black}
        onFilled={handleOtpFilled}
        theme={{
          pinCodeTextStyle: styles.otpText,
          pinCodeContainerStyle: styles.otpBox,
        }}
      />
      <Timer onPressResend={handleResend} />
    </View>
  );
};

export default CustomOtpInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.grey22,
    borderRadius: 6,
  },
  otpBoxError: {
    borderColor: colors.red2,
  },
  otpText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.black,
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.red1,
    textAlign: 'center',
    marginTop: 10,
  },
});
