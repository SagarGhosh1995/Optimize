import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import Login from '../../../features/auth/screens/Login';
import useAuthenticated from '../../../shared/hooks/useAuthenticated';
import Logout from '../../../features/auth/screens/Logout';
import EditProfile from '../../../features/account/screens/EditProfile';
import Orders from '../../../stores/genx/screens/orders/Orders';
import Address from '../../../stores/genx/screens/address/Address';
import EditAddress from '../../../stores/genx/screens/address/EditAddress';

const Stack = createNativeStackNavigator()

const GenxNavigator = () => {
  const isAuthenticated = useAuthenticated();

  console.log('isAuthenticated  ', isAuthenticated);


  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      {!isAuthenticated ? (
        <Stack.Screen name="login" component={Login} />
      ) : (
        <>
          <Stack.Screen name="genxtabs" component={TabNavigator} />
          <Stack.Screen name='editprofile' component={EditProfile} />
          <Stack.Screen name="orders" component={Orders} />
          <Stack.Screen name='address' component={Address} />
          <Stack.Screen name='editaddress' component={EditAddress} />
          <Stack.Screen name='logout' component={Logout} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default GenxNavigator