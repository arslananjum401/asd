
import { createReducer } from '@reduxjs/toolkit';

const InitialState = {
    SCourse: {},
    EnrolledCourses: [],
    EnrolledCourse: {}
};
export const CourseReducer = createReducer(InitialState, {
    CourseRequest: (state, action) => {
        state.loading = true;
    },

    CourseSuccess: (state, action) => {
        state.loading = false;
        state.Courses = action.payload;
    },
    CourseFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },



    SingleCourseRequest: (state, action) => {
        state.loading = true;
    },

    SingleCourseSuccess: (state, action) => {
        state.loading = false;
        state.SCourse = action.payload;
    },
    SingleCourseFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },



    CreateCourseRequest: (state, action) => {
        state.loading = true;
    },

    CreateCourseSuccess: (state, action) => {
        state.loading = false;
        state.CourseCreated = action.payload;
    },
    CreateCourseFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    EnrollCourseRequest: (state, action) => {
        state.loading = true;
    },

    EnrollCourseSuccess: (state, action) => {
        state.loading = false;
        state.EnrolledCourse = action.payload;
        state.SCourse = action.SCourse;
    },
    EnrollCourseFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },



    UnEnrollCourseRequest: (state, action) => {
        state.loading = true;
    },

    UnEnrollCourseSuccess: (state, action) => {
        state.loading = false;
        state.EnrolledCourse = undefined;
    },
    UnEnrollCourseFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },



    GetEnrolledRequest: (state, action) => {
        state.loading = true;
    },

    GetEnrolledSuccess: (state, action) => {
        state.loading = false;
        state.EnrolledCourses = action.payload;
    },
    GetEnrolledFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },




    GetSEnrolledRequest: (state, action) => {
        state.loading = true;
    },
    GetSEnrolledSuccess: (state, action) => {
        state.loading = false;
        state.EnrolledCourse = action.payload;
        state.SCourse = action.SCourse;
    },
    GetSEnrolledFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },



})
