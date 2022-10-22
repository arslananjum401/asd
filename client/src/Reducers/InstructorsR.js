import { createReducer } from '@reduxjs/toolkit';

const InitialState = {
    loading: false,
    Instructors: [],
    error: "",
    Instructor: [],

    SInstructor: ""
};

export const InstructorReducer = createReducer(InitialState, {
    CreateInstructorRequest: (state, action) => {
        state.loading = true;
    },
    CreateInstructorSuccess: (state, action) => {
        state.loading = false;
        state.Instructor = action.payload;
        state.Success = true;

        state.error = ''

    },
    CreateInstructorFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.Success = false;
    },


    UpdateInstructorRequest: (state, action) => {
        state.loading = true;
    },
    UpdateInstructorSuccess: (state, action) => {
        state.loading = false;
        state.Instructor = action.payload;
        state.Success = true;
    },
    UpdateInstructorFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.Success = false;
    },



    getInstructorsRequest: (state, action) => {
        state.loading = true;
    },
    getInstructorsSuccess: (state, action) => {
        state.loading = false;
        state.Instructors = action.payload;
    },
    getInstructorsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },



    getInstructorRequest: (state, action) => {
        state.loading = true;
    },
    getInstructorSuccess: (state, action) => {
        state.loading = false;
        state.SInstructor = action.payload;
 
    },
    getInstructorFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


})