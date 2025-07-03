import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface accountInterface {
    user: null | {
        name: string,
        image: string,
        dob: string,
        gender: string
    }
}

const initialState: accountInterface = {
    user: null
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {        
        setUser(state, action: PayloadAction<accountInterface['user']>) {
            state.user = action.payload;
        },
        clearAccount(state) {
            state.user = null
        },
    },
});

export const { setUser, clearAccount } = accountSlice.actions;
export default accountSlice.reducer;