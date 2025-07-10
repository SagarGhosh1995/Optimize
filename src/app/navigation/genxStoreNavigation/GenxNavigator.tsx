import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import Login from '../../../features/auth/screens/Login';
import { genxStore } from '../../../stores/genx/redux/store';
import { useAppSelector } from '../../../globalRedux/useTypedHooks';
import useAuthenticated from '../../../shared/hooks/useAuthenticated';
import Logout from '../../../features/auth/screens/Logout';

const Stack = createNativeStackNavigator()

const GenxNavigator = () => {
  const isAuthenticated = useAuthenticated();


  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      {!isAuthenticated ? (
        <Stack.Screen name="login" component={Login} />
      ) : (
        <>
          <Stack.Screen name="genxtabs" component={TabNavigator} />
          <Stack.Screen name='logout' component={Logout} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default GenxNavigator