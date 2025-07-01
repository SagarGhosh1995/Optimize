import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface accountInterface {
    authdata: null | {
        access_token: string;
        googleLogin: boolean;
        isAppleLogin: boolean;
    };
    user: null | {
        name: string,
        image: string,
        dob: string,
        gender: string
    }
}

const initialState: accountInterface = {
    authdata: null,
    user: null
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAuthData(state, action: PayloadAction<accountInterface['authdata']>) {
            state.authdata = action.payload;
        },
        setUser(state, action: PayloadAction<accountInterface['user']>) {
            state.user = action.payload;
        },
        logout(state) {
            state.authdata = null;
            state.user = null
        },
    },
});

export const { setAuthData, setUser, logout } = accountSlice.actions;
export default accountSlice.reducer;