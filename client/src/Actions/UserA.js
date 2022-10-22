import axios from 'axios';
import { SetLocalStorage } from '../Helpers/LocalStorage.js'
export const InstituteRequests = () => async (dispatch) => {
    try {
        dispatch({
            type: "InstituteReqRequest"
        });

        const { data } = await axios.get('/admin/InstitutesRequest');

        dispatch({
            type: "InstituteReqSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "InstituteReqFailure",
            payload: error.response.data.message,
        })
    }
}

export const SignUpUser = (Signupdata, User) => async (dispatch) => {
    const { UserName, Email, Password, InstituteName, InstituteLocation } = Signupdata;
    if (User === undefined) {
        User = ''
    }
    try {
        dispatch({
            type: "SignUpRequest"
        })

        const { data } = await axios.post(`/common/Signup`,
            {
                UserName,
                Email,
                Password,
                InstituteName,
                InstituteLocation
            },
            {
                headers: { "Content-Type": "application/json" }
            },
            { withCredentials: true }

        )

        dispatch({
            type: "SignUpSuccess",
            payload: data.User
        })
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({
            type: "SignUpFailure",
            payload: error.response.data.message,
        })
    }

}
export const RegisterInstituteAction = (DATA, User) => async (dispatch) => {
    if (User === undefined) {
        User = ''
    }
    try {
        dispatch({
            type: "SignUpRequest"
        })

        const { data } = await axios.post(`/common/Institute/Register`,

            DATA,
            {
                headers: { "Content-Type": "application/json" }
            },

        )

        dispatch({
            type: "SignUpSuccess",
            payload: data
        })
    } catch (error) {
        console.log(error.response.data.error);
        dispatch({
            type: "SignUpFailure",
            payload: error.response.data.error,
        })
    }

}
export const LoginUser = (LoginData) => async (dispatch) => {

    try {
        dispatch({
            type: "LoginRequest"
        })

        const { data } = await axios.post(`/common/login`,
            LoginData,
            {
                headers: { "Content-Type": "application/json" }
            })

        dispatch({
            type: "LoginSuccess",
            payload: data.User,
            Interest: data.Interest
        })
        SetLocalStorage("User", data.User)
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({
            type: "LoginFailure",
            payload: error.response.data.message,
        })
    }
}
export const GetAllCourses = (User) => async (dispatch) => {
    if (User !== "/Institute") {
        User = 'Common'

    }

    try {
        dispatch({
            type: "CourseRequest"
        })

        const { data } = await axios.get(`${User}/courses`,
            {
                withCredentials: true
            }
        );
        // console.log(data)
        dispatch({
            type: "CourseSuccess",
            payload: data
        })
    } catch (error) {
        // console.log(error.response)
        dispatch({
            type: "CourseFailure",
            payload: error.response,
        })
    }
}


export const GetUser = () => async (dispatch) => {

    try {
        dispatch({
            type: "getUserRequest",

        })
        const { data } = await axios.get(`/Common/me`,
            {
                withCredentials: true
            });

        dispatch({
            type: "getUserSuccess",
            payload: data.data,
            Notifications: data.Notifications,
            Interest: data.Interest,
            Message: data.message,
            ProductsInCart: data.ProductsInCart
        })
    } catch (error) {
        dispatch({
            type: "getUserFailure",
            payload: error.response.data.message,
        })
    }
}
export const GetInstituteOnReqRes = (User) => (dispatch) => {
    if (User.ApplicationStatus === 'Accepted') {
        dispatch({
            type: "getUserSuccess",
            payload: User,
            Message: undefined
        })
    } else {
        dispatch({
            type: "getUserSuccess",
            payload: User,
            Message: "Your Request has been rejected"
        })
    }

}
export const ChangedInterest = (body, id) => async (dispatch) => {
    const Body = {
        InterestId: id,
        CourseCategory: body
    }
    try {

        dispatch({
            type: "getStuInterestRequest"
        })
        const { data } = await axios.put('/me/Interest',
            Body,
        )
        dispatch({
            type: "getStuInterestSuccess",
            Interest: data
        })
    } catch (error) {

    }
}
export const LogOutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'logOutUserRequest'
        })
        const { data } = await axios.get('/common/logout');
        dispatch({
            type: 'logOutUserSuccess',
            payload: undefined,
            message: data.message
        })
    } catch (error) {
        dispatch({
            type: "logOutUserFailure",
            payload: error
        })
    }
}

export const EmptyLogout = () => async (dispatch) => {
    dispatch({
        type: 'logOutUserSuccess',
        payload: undefined,

    })
}
export const CreateNewCoures = (CourseData) => async (dispatch) => {
    dispatch({
        type: "CreateCourseRequest"
    })
    try {
        const { data } = await axios.post('/Institute/course/create',
            CourseData,
            {
                headers: { "Content-Type": "application/json" }
            })

        dispatch({
            type: "CreateCourseSuccess",
            payload: data
        })
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({
            type: "CreateCourseFailure",
            payload: error.response.data.message,
        })
    }
}
export const UpdateCurrentCourse = (CourseData, ProductId) => async (dispatch) => {
    CourseData.ProductId = ProductId;
    dispatch({
        type: "CreateCourseRequest"
    })
    try {
        const { data } = await axios.put('/Institute/course/update',
            CourseData,
            {
                headers: { "Content-Type": "application/json" }
            })

        dispatch({
            type: "CreateCourseSuccess",
            payload: data
        })
    } catch (error) {
        // console.log(error.response.data.message);
        dispatch({
            type: "CreateCourseFailure",
            payload: error.response.data.message,
        })
    }
}


export const GetSingleCourse = (ProductId) => async (dispatch) => {
    try {
        dispatch({
            type: "SingleCourseRequest"
        })

        const { data } = await axios.get(`/admin/course/${ProductId}`);

        dispatch({
            type: "SingleCourseSuccess",
            payload: data
        })

    } catch (error) {
        console.log(error.response.data.message);
        dispatch({
            type: "SingleCourseFailure",
            payload: error.response.data.message,
        })
    }
}
export const GetAllCategories = () => async (dispatch) => {
    try {
        dispatch({
            type: "CategoriesRequest"
        })

        const { data } = await axios.get('/Admin/LicenseTypes');
        dispatch({
            type: "CategoriesSuccess",
            payload: data
        })

    } catch (error) {
        console.log(error.response.data.message);
        dispatch({
            type: "CreateCourseFailure",
            payload: error.response.data.message,
        })
    }
}

export const GetInstituteList = () => async (dispatch) => {
    try {
        dispatch({
            type: "InstituteListRequest"
        })
        const { data } = await axios.get('/GetInstituteList');

        dispatch({
            type: "InstituteListSuccess",
            payload: data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: "CreateCourseFailure",
            payload: error,
        })
    }
}


export const AcceptedInstituteRequests = () => async (dispatch) => {
    try {
        dispatch({
            type: "AcceptedReqRequest"
        })

        const { data } = await axios.get('/admin/InstitutesRequest/accepted');
        dispatch({
            type: "AcceptedReqSuccess",
            payload: data
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: "AcceptedReqFailure",
            payload: error,
        })
    }
}

export const LoginWithGoogleAction = (LoginInfo) => async (dispatch) => {


    try {
        dispatch({
            type: "LoginRequest",
        })
        const { data } = await axios.post('/common/login/Google', LoginInfo,
            {
                headers: { "Content-Type": "application/json" }
            });


        dispatch({
            type: "LoginSuccess",
            payload: data.User,
            Interest: data.Interest
        })
        SetLocalStorage("User", data.User)
    } catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error,
        })

    }
}
export const SignUpWithGoogleAction = (SignUpInfo) => async (dispatch) => {


    try {
        dispatch({
            type: "SignUpRequest",
        })
        const { data } = await axios.post('/common/signup/Google', SignUpInfo);
        console.log(data?.User);

        dispatch({
            type: "SignUpSuccess",
            payload: data?.User,
            Interest: data?.Interest
        })
        SetLocalStorage("User", data?.User);
    } catch (error) {
        dispatch({
            type: "SignUpFailure",
            payload: error,
        })

    }
}


export const LoginWithFacebookAction = (LoginInfo) => async (dispatch) => {


    try {
        dispatch({
            type: "LoginRequest",
        })
        const { data } = await axios.post('/common/login/facebook', LoginInfo,
            {
                headers: { "Content-Type": "application/json" }
            });
        console.log(data);

        dispatch({
            type: "LoginSuccess",
            payload: data.User,
            Interest: data.Interest
        })
        SetLocalStorage("User", data.User)
    } catch (error) {
        dispatch({
            type: "LoginFailure",
            payload: error,
        })

    }
}

export const SignUpWithFacebookAction = (SignUpInfo) => async (dispatch) => {


    try {
        dispatch({
            type: "SignUpRequest",
        })
        const { data } = await axios.post('/common/signup/facebook', SignUpInfo);
        console.log(data?.User);

        dispatch({
            type: "SignUpSuccess",
            payload: data?.User,
            Interest: data?.Interest
        })
        console.log(data?.User)
        console.log(data)
        SetLocalStorage("User", data?.User);
    } catch (error) {
        dispatch({
            type: "SignUpFailure",
            payload: error,
        })

    }
}


