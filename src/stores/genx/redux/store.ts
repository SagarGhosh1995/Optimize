import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer from '../../../features/account/accountSlice'
import authReducer from '../../../features/auth/authSlice'
import addressReducer from '../screens/address/addressSlice'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from 'redux-persist';

// 1. Combine reducers
export const rootReducer = combineReducers({
  auth: authReducer,
  user: accountReducer,
  address: addressReducer
});

// 2. Set up persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'user', 'address'], // persist only these slices
  blacklist: ['navigation']
};

// 3. Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Create store with persisted reducer
export const genxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ⚠️ disable serializableCheck for redux-persist
    }),
})

// 5. Create persistor
export const genxPersistor = persistStore(genxStore);

export type GenxRootStoreType = ReturnType<typeof genxStore.getState>;
export type GenxDispatchType = typeof genxStore.dispatch;