import { createReducer } from '@reduxjs/toolkit';

const InitialState = {
    // loading: false,
};
export const ForgotPasswordReducer = createReducer(InitialState, {
    ForgotPasswordRequest:(state,action)=>{
        state.loading=true;
    },
    ForgotPasswordSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload;
        state.error=undefined;
    },
    ForgotPasswordFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.message=undefined;
    },



    

    CheckResetTokenRequest:(state,action)=>{
        state.loading=true;
    },
    CheckResetTokenSuccess:(state,action)=>{
        state.loading=false;
        state.CTmessage=action.payload;
        state.error=undefined;
    },
    CheckResetTokenFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.CTmessage=undefined;
    },



    ResetTokenRequest:(state,action)=>{
        state.loading=true;
    },
    ResetTokenSuccess:(state,action)=>{
        state.loading=false;
        state.RPmessage=action.payload;
        state.error=undefined;
    },
    ResetTokenFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.RPmessage=undefined;
    },
})