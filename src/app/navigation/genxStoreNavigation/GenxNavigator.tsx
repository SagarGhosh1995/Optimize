import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import Login from '../../../features/auth/screens/Login';
import { genxStore } from '../../../stores/genx/redux/store';

const Stack = createNativeStackNavigator() 

const GenxNavigator = () => {
  return (
    <Provider store={genxStore}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='login' component={Login} />
        <Stack.Screen name="genxtabs" component={TabNavigator} />
      </Stack.Navigator>
    </Provider>
  )
}

export default GenxNavigator