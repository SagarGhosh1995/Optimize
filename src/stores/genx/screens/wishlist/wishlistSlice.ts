import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface wishlistInterface {
    wishlistIds: string[];
}

const initialState: wishlistInterface = {
    wishlistIds: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishListIds: (state, action: PayloadAction<string[]>) => {
            state.wishlistIds = action.payload; // replaces the whole array
        },
        addWishlistId: (state, action: PayloadAction<string>) => {
            if (!state.wishlistIds.includes(action.payload)) {
                state.wishlistIds.push(action.payload);
            }
        },
        removeWishlistId: (state, action: PayloadAction<string>) => {
            state.wishlistIds = state.wishlistIds.filter(id => id !== action.payload);
        },
        clearWishlistIds(state) {
            state.wishlistIds = [];
        },
    },
});

export const { setWishListIds, addWishlistId, removeWishlistId, clearWishlistIds } = wishlistSlice.actions;
export default wishlistSlice.reducer;