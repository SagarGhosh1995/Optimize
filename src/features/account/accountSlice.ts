import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserProfileDataType = null | {
    name: string,
    dob: string,
    gender: string,
    avatar: string,
    email: string | null,
    phone: number | string | null,
    _id: string
}

interface accountInterface {
    user: UserProfileDataType
}

const initialState: accountInterface = {
    user: null
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<accountInterface['user']>) {
            state.user = action.payload;
        },
        clearAccount(state) {
            state.user = null
        },
    },
});

export const { setUserData, clearAccount } = accountSlice.actions;
export default accountSlice.reducer;