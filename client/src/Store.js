import { configureStore } from '@reduxjs/toolkit';
import { UserReducer, AdminReducer, CategoriesReducer, InstituteListReducer } from './Reducers/UserR.js'
import { CourseReducer } from './Reducers/CourseR.js';
import { SocketReducer } from './Reducers/SocketR.js';
import { InstructorReducer } from './Reducers/InstructorsR.js';
import { ListReducer } from './Reducers/ListR.js';
import { ForgotPasswordReducer } from './Reducers/ForgotPasswordR.js';
import { WishListReducer } from './Reducers/WishListR.js';
import { BuyingReducer } from './Reducers/BuyingR.js';
const Store = configureStore({
    reducer: {
        UserReducer,
        CourseReducer,
        AdminReducer,
        CategoriesReducer,
        InstituteListReducer,
        SocketReducer,
        InstructorReducer,
        ListReducer,
        ForgotPasswordReducer,
        WishListReducer,
        BuyingReducer
    }
})

export default Store;