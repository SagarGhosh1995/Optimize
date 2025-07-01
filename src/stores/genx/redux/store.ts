import { configureStore } from "@reduxjs/toolkit";
import accountReducer from '../../../features/account/accountSlice'

export const genxStore = configureStore({
  reducer: {
    user: accountReducer,
    // other reducers like cart if needed
  },
});

export type GenxRootStoreType = ReturnType<typeof genxStore.getState>;
export type GenxDispatchType = typeof genxStore.dispatch;