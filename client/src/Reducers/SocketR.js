import { createReducer } from '@reduxjs/toolkit';

const InitialState = {
    join: false,
    socket: undefined
};
export const SocketReducer = createReducer(InitialState, {
    SetupSocket: (state, action) => {
        state.socket = action.payload;
        state.join = true;
    },
})