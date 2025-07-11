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
import { useStoreId } from '../../globalContext/hooks';
import { Provider } from 'react-redux';
import { genxStore } from '../../stores/genx/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Splash from '../../features/splash';
import { navigationRef } from './NavigationHelper';
import { useReduxPersistorStore } from './hooks';

const Navigation = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [time, setTime] = useState(0)
  const storeId: string = useStoreId()
  const reduxPersistorStore = useReduxPersistorStore()
  // const { theme } = useTheme()


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
      <PersistGate loading={null} persistor={reduxPersistorStore}>
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