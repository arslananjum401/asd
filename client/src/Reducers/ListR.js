import { createReducer } from '@reduxjs/toolkit';

const InitialState = {
    Institutes: [],
    Students:[],
    Instructors:[],
    loading:false,
    error:'',
    Institute:""
};
export const ListReducer = createReducer(InitialState, {
    InstitutesRequest: (state, action) => {
        state.loading = true;
    },
    InstitutesSuccess: (state, action) => {
        state.loading = false;
        state.Institutes = action.payload;
        state.Institute = action.Institute;
    },
    InstitutesFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },



    StudentsRequest: (state, action) => {
        state.loading = true;
    },
    StudentsSuccess: (state, action) => {
        state.loading = false;
        state.Students = action.payload;
    },
    StudentsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },



    InstructorsRequest: (state, action) => {
        state.loading = true;
    },
    InstructorsSuccess: (state, action) => {
        state.loading = false;
        state.Instructors = action.payload;
    },
    InstructorsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
})