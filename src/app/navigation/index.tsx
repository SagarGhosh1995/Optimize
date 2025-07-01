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

const Navigation = () => {
   const storeId: string = 'genx'

  const getStoreNavigator = () => {
    switch (storeId) {
      case 'genx': return <GenxNavigator />;
      case 'prebook' : return <PreBookNavigator />;
      default: return <GenxNavigator />;
    }
  };
  return <NavigationContainer>
      {getStoreNavigator()}
    </NavigationContainer>
};

export default Navigation;