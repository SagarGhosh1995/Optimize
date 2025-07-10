import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserAuthDataType = null | {
    userId: string,
    message?: string
    access_token: string;
    refresh_token: string,
    googleLogin?: boolean;
    isAppleLogin?: boolean;
    registration_complete: boolean,
}

interface accountInterface {
    authdata: UserAuthDataType;
}

const initialState: accountInterface = {
    authdata: null,
};

const authSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAuthData(state, action: PayloadAction<accountInterface['authdata']>) {
            state.authdata = action.payload;
        },
        clearAuth(state) {
            state.authdata = null;
        },
    },
});

export const { setAuthData, clearAuth } = authSlice.actions;
export default authSlice.reducer;