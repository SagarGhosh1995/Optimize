import { configureStore } from "@reduxjs/toolkit";
import accountReducer from '../../../features/account/accountSlice'
import authReducer from '../../../features/auth/authSlice'

export const genxStore = configureStore({
  reducer: {
    auth: authReducer,
    user: accountReducer,
    // other reducers like cart if needed
  },
});

export type GenxRootStoreType = ReturnType<typeof genxStore.getState>;
export type GenxDispatchType = typeof genxStore.dispatch;