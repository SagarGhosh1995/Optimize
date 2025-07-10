/**
 * 
 * This is root navigation file
 * store wise navigation defines here
 * 
 */

import React, { useEffect, useRef, useState } from 'react';
import GenxNavigator from './genxStoreNavigation/GenxNavigator';
import PreBookNavigator from './prebookStoreNavigation/PreBookNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useStoreId, useTheme } from '../../globalContext/hooks';
import { Provider } from 'react-redux';
import { genxPersistor, genxStore } from '../../stores/genx/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Splash from '../../splash';
import { navigationRef } from './NavigationHelper';

const Navigation = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [time, setTime] = useState(0)
  const storeId: string = useStoreId()
  const { theme } = useTheme()
  // console.log('context storeId => ',storeId);
  // console.log('theme ',theme);

  useEffect(() => {
    startTimer();
    return () => {
      closeTimer()
    }
  }, []);

  useEffect(() => {
    if (time >= 3) {
      closeTimer()
    }
  }, [time])

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // Clear any previous timers
    }

    timerRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  }

  const closeTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }


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
      <PersistGate loading={null} persistor={genxPersistor}>
        {
          (time !== 3) ?
            <Splash />
            :
            <NavigationContainer
              ref={navigationRef}
            >
              {getStoreNavigator()}
            </NavigationContainer>
        }
      </PersistGate>
    </Provider>
  )
};

export default Navigation;