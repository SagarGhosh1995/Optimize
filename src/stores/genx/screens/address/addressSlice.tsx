import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface addressSliceInterface {
    address: Array<any>;
    defaultAddress?: Object | null
}

const initialState: addressSliceInterface = {
    address: [],
    defaultAddress: null
};

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<addressSliceInterface['address']>) => {
            state.address = action.payload; // replaces the whole array
        },
        setDefaultAddress: (state, action: PayloadAction<addressSliceInterface['defaultAddress']>) => {
            state.defaultAddress = action.payload; // replaces the whole array
        },
        addAddress: (state, action: PayloadAction<{ _id: string;[key: string]: any }>) => {
            const exists = state.address.some(addr => addr._id === action.payload?._id);
            if (!exists) {
                state.address.push(action.payload);
            }
        },
        deleteAddress: (state, action: PayloadAction<string>) => {
            state.address = state.address.filter(addr => addr._id !== action.payload);
        },
        clearAddress(state) {
            state.address = [];
            state.defaultAddress = null
        },
    },
});

export const { setAddress, addAddress, deleteAddress, clearAddress, setDefaultAddress } = addressSlice.actions;
export default addressSlice.reducer;