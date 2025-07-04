import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'


const Stack = createNativeStackNavigator()

const PreBookNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='prebooktabs' component={TabNavigator} />
    </Stack.Navigator>
  )
}

export default PreBookNavigator