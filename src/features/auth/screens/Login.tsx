import React from 'react';
import { View, StyleSheet, ImageBackground, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../component/Header';
import LoginForm from '../component/LoginForm';
import { images } from '../../../shared/constants/images';
import { isIOS } from '../../../shared/constants/dimensions';

const Login = () => {
  return (
    <ImageBackground
      source={images.loginbg}
      style={styles.container}
      resizeMode="cover"
    >
      <KeyboardAwareScrollView
        enableAutomaticScroll
        enableOnAndroid
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Header />
        <LoginForm containerStyle={styles.formContainer} />
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: isIOS ? 0.9 : 0.5,
  },
});
