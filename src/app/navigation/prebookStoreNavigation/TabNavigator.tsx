import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../../../stores/prebook/screens/home/Home'


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name='home' component={Home} />
    </Tab.Navigator>
  )
}


export default TabNavigator