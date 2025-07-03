/**
 * 
 * This is root navigation file
 * store wise navigation defines here
 * 
 */

import React from 'react';
import GenxNavigator from './genxStoreNavigation/GenxNavigator';
import PreBookNavigator from './prebookStoreNavigation/PreBookNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useStoreId, useTheme } from '../../globalContext/hooks';
import { Provider } from 'react-redux';
import { genxStore } from '../../stores/genx/redux/store';

const Navigation = () => {
  const storeId: string = useStoreId()
  const {theme} = useTheme()
  // console.log('context storeId => ',storeId);
  // console.log('theme ',theme);
  
  
  const getStoreNavigator = () => {
    switch (storeId) {
      case 'genx': return <GenxNavigator />;
      case 'prebook': return <PreBookNavigator />;
      default: return <GenxNavigator />;
    }
  };

  const getReduxStore = () => {
    switch (storeId) {
      case 'genx': return genxStore;
      default: return genxStore;
    }
  }

  return (
    <Provider store={getReduxStore()}>
      <NavigationContainer>
        {getStoreNavigator()}
      </NavigationContainer>
    </Provider>
  )
};

export default Navigation;