import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../../stores/genx/screens/home/Home';
import Wishlist from '../../../stores/genx/screens/wishlist/Wishlist';
import Cart from '../../../stores/genx/screens/cart/Cart';
import Shop from '../../../stores/genx/screens/shop/Shop';


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name='wishlist' component={Wishlist} />
      <Tab.Screen name='cart' component={Cart} />
      <Tab.Screen name='shop' component={Shop} />
    </Tab.Navigator>
  )
}

export default TabNavigator