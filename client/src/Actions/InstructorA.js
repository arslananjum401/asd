import axios from "axios"

export const CreateInstructors = (Instructor) => async (dispatch) => {
    try {
        dispatch({
            type: "CreateInstructorRequest",
        })
        const { data } = await axios.post('/institute/instructor/create', Instructor);
        dispatch({
            type: "CreateInstructorSuccess",
            payload: data
        })

    } catch (error) {
        dispatch({
            type: "CreateInstructorFailure",
            payload: error
        })
    }
}
export const GetAllInstructors = () => async (dispatch) => {
    try {
        dispatch({
            type: "getInstructorsRequest",
        })
        const { data } = await axios.get('/institute/instructors/my');
        dispatch({
            type: "getInstructorsSuccess",
            payload: data
        })

    } catch (error) {
        dispatch({
            type: "getInstructorsFailure",
            payload: error
        })
    }
}
export const GetSingleInstructor = (InstructorPK) => async (dispatch) => {
    try {
        dispatch({
            type: "getInstructorRequest",
        })
        const { data } = await axios.get(`/institute/Instructor/${InstructorPK}`,

        );

        if (data.message === "Instructor not found") {
            dispatch({
                type: "getInstructorSuccess",
                payload: undefined,
            })
        }
        dispatch({
            type: "getInstructorSuccess",
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: "getInstructorFailure",
            payload: error
        })
    }
}
export const UpdateInstructorA = (Instructor) => async (dispatch) => {
    try {
        dispatch({
            type: "UpdateInstructorRequest",
        })
        const { data } = await axios.put('/institute/instructor/update', Instructor);


        dispatch({
            type: "UpdateInstructorSuccess",
            payload: data.GetInstructor,
            SCourses: data.GetInstructorCourse
        })

    } catch (error) {
        dispatch({
            type: "UpdateInstructorFailure",
            payload: error
        })
    }
}