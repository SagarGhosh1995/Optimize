import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import Login from '../../../features/auth/screens/Login';
import { genxStore } from '../../../stores/genx/redux/store';
import { useAppSelector } from '../../../globalRedux/useTypedHooks';

const Stack = createNativeStackNavigator() 

const GenxNavigator = () => {
  const auth = useAppSelector((state) => state.auth.authdata);
  const isAuthenticated = !!auth?.access_token;
  console.log('auth  ===> ',auth);
  
  return (
      <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      >
        {!isAuthenticated ? (
        <Stack.Screen name="login" component={Login} />
      ) : (
        <Stack.Screen name="genxtabs" component={TabNavigator} />
      )}
      </Stack.Navigator>
  )
}

export default GenxNavigator