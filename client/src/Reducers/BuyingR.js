import { createReducer } from '@reduxjs/toolkit';

const InitialState = {
    SCourse: {},
    EnrolledCourses: [],
    EnrolledCourse: {}
};
export const BuyingReducer = createReducer(InitialState, {
    



    BuyCourseRequest: (state, action) => {
        state.loading = false;
    },
    BuyCourseSuccess: (state, action) => {
        state.loading = false;
        state.BoughtCourse = action.payload;
    },
    BuyCourseFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
})