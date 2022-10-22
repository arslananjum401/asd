import { createReducer } from '@reduxjs/toolkit';

const InitialState = {
    SCourse: {},
    EnrolledCourses: [],
    EnrolledCourse: {}
};


export const UserReducer = createReducer(InitialState, {
    SignUpRequest: (state) => {
        state.loading = true;
    },
    SignUpSuccess: (state, action) => {
        state.loading = false;
        state.User = action.payload;
        state.User = action.payload;
        state.Interest = action.Interest;
        state.isAuthenticated = true;
    },
    SignUpFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },


    LoginRequest: (state) => {
        state.loading = true;
    },
    LoginSuccess: (state, action) => {
        state.loading = false;
        state.User = action.payload;
        state.Interest = action.Interest;
        state.isAuthenticated = true;
    },
    LoginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },



    getUserRequest: (state, action) => {
        state.loading = true;
    },
    getUserSuccess: (state, action) => {
        state.loading = false;
        state.User = action.payload;
        state.Notifications = action.Notifications;
        state.Interest = action.Interest;
        state.ProductsInCart = action.ProductsInCart;
        state.Message = action.Message
        state.isAuthenticated = true;
    },

    getUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },
    getStuInterestRequest: (state, action) => {
        state.loading = true;
    },
    getStuInterestSuccess: (state, action) => {
        state.loading = false;
        state.Interest = action.Interest;
    },

    getStuInterestFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    logOutUserRequest: (state, action) => {
        state.loading = true;
    },
    logOutUserSuccess: (state, action) => {
        state.loading = false;
        state.User = action.payload;
        state.Msg = action.message;
        state.isAuthenticated = false;
    },
    logOutUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    AddToCartRequest: (state, action) => {
        state.loading = true;
    },
    AddToCartSuccess: (state, action) => {
        state.loading = false;
        state.ProductsInCart = action.payload;
    },
    AddToCartFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },



    RemoveFromCartRequest: (state, action) => {
        state.loading = true;
    },
    RemoveFromCartSuccess: (state, action) => {
        state.loading = false;
        state.ProductsInCart = action.payload;
    },
    RemoveFromCartFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    GetCartRequest:(state,action)=>{
        state.loading = true;
    },
    GetCartSuccess:(state,action)=>{
        state.loading = false;
        state.ProductsInCart = action.payload;
    },
    GetCartFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },

})

export const AdminReducer = createReducer(InitialState, {
    InstituteReqRequest: (state, action) => {
        state.loading = true;
    },
    InstituteReqSuccess: (state, action) => {
        state.loading = false;
        state.Request = action.payload;
    },
    InstituteReqFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    AcceptedReqRequest: (state, action) => {
        state.loading = true;
    },
    AcceptedReqSuccess: (state, action) => {
        state.loading = false;
        state.AcceptedRequests = action.payload;
    },
    AcceptedReqFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

})

export const CategoriesReducer = createReducer(InitialState, {
    CategoriesRequest: (state, action) => {
        state.loading = true;
    },
    CategoriesSuccess: (state, action) => {
        state.loading = false;
        state.Categories = action.payload;
    },
    CategoriesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
})

export const InstituteListReducer = createReducer(InitialState, {
    InstituteListRequest: (state, action) => {
        state.loading = true;
    },
    InstituteListSuccess: (state, action) => {
        state.loading = false;
        state.InstitutesList = action.payload;
    },
    InstituteListFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
})