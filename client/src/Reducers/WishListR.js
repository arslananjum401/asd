import { createReducer } from '@reduxjs/toolkit';

const InitialState = {

};


export const WishListReducer = createReducer(InitialState, {

    AddWishRequest: (state, action) => {
        state.loading = true;

    },
    AddWishSuccess: (state, action) => {
        state.loading = false;
        state.WishList = action.payload
    },
    AddWishFailure: (state, action) => {
        state.loading = false;
        state.Werror = action.payload;
    },



    GetAllWishesRequest: (state, action) => {
        state.loading = true;

    },
    GetAllWishesSuccess: (state, action) => {
        state.loading = false;
        state.WishList = action.payload;
    },
    GetAllWishesFailure: (state, action) => {
        state.loading = false;
        state.Werror = action.payload;
    },


    RemoveWishRequest: (state, action) => {
        state.loading = true;

    },
    RemoveWishSuccess: (state, action) => {
        state.loading = false;
        state.WishList = action.payload;
    },
    RemoveWishFailure: (state, action) => {
        state.loading = false;
        state.Werror = action.payload;
    },

})