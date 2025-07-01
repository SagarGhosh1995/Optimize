import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Navigation from './navigation'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '../shared/constants/colors'
import Toast from 'react-native-toast-message'
import { toastConfig } from '../shared/utils/toast'

const App = () => {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  )
}

const AppContent = () => {
 

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor={'transparent'} animated barStyle={'dark-content'} />
      <Navigation />
      <Toast config={toastConfig} />
    </View>
  );
};

export default App