import { View, Text, StatusBar, Appearance } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './navigation'
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { toastConfig } from '../shared/utils/toast'
import { StoreContextProvider } from '../globalContext/StoreContext'
import { ThemeContextProvider } from '../globalContext/ThemeContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StoreContextProvider>
        <ThemeContextProvider>
          <SafeAreaProvider>
            <AppContent />
          </SafeAreaProvider>
        </ThemeContextProvider>
      </StoreContextProvider>
    </GestureHandlerRootView>
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