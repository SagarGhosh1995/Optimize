import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../../stores/genx/screens/home/Home';
import Wishlist from '../../../stores/genx/screens/wishlist/Wishlist';
import Cart from '../../../stores/genx/screens/cart/Cart';
import Shop from '../../../stores/genx/screens/shop/Shop';
import { TabBar } from './component/TabBar';
import { icons } from '../../../shared/constants/icons';
import { images } from '../../../shared/constants/images';
import { fonts } from '../../../shared/constants/fonts';
import { colors } from '../../../shared/constants/colors';
import { isIOS } from '../../../shared/constants/dimensions';
import Profile from '../../../features/account/screens/Profile';

const Tab = createBottomTabNavigator();

const renderIcon = (focused: boolean, activeIcon: any, inactiveIcon: any) => (
  <Image source={focused ? activeIcon : inactiveIcon} style={styles.icon} resizeMode="contain" />
);

const renderLabel = (focused: boolean, label: string) =>
  focused ? <Text style={styles.label}  allowFontScaling={false}>{label}</Text> : null;

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName="home"
    >
      <Tab.Screen
        name="shop"
        component={Shop}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(focused, icons.shopfill, icons.shop),
          tabBarLabel: ({ focused }) => renderLabel(focused, 'Shop'),
        }}
      />
      <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          tabBarBadge: '9',
          tabBarIcon: ({ focused }) => renderIcon(focused, icons.bagfill, icons.bag),
          tabBarLabel: ({ focused }) => renderLabel(focused, 'Cart'),
        }}
      />
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <View style={styles.homeLogoContainer}>
              <Image source={images.hometablogo} style={styles.hometablogo} />
            </View>
          ),
          tabBarLabel: () => null, // hide label
        }}
      />
      <Tab.Screen
        name="wishlist"
        component={Wishlist}
        options={{
          tabBarBadge: 3,
          tabBarIcon: ({ focused }) => renderIcon(focused, icons.heartfill, icons.heart),
          tabBarLabel: ({ focused }) => renderLabel(focused, 'Wishlist'),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(focused, icons.userfill, icons.user),
          tabBarLabel: ({ focused }) => renderLabel(focused, 'Profile'),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;


const styles = StyleSheet.create({
  icon: {
    width: isIOS ? 22 : 20,
    height: isIOS ? 22 : 20,
  },
  homeLogoContainer: {
    marginTop: isIOS ? -2 : -16,
  },
  hometablogo: {
    width: isIOS ? 90 : 80,
    height: isIOS ? 90 : 80
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2
  },
})