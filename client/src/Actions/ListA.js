import axios from "axios"

export const GetAllInstitutes = () => async (dispatch) => {
    try {
        dispatch({
            type: "InstitutesRequest",
        })

        const { data } = await axios.get('/admin/AllInstitutes');


        dispatch({
            type: "InstitutesSuccess",
            payload: data
        })
    } catch (error) {
        dispatch({
            type: "InstitutesFailure",
            payload: error
        })
    }
}


export const GetInstitute = (UserId) => async (dispatch) => {
    try {
        dispatch({
            type: "InstitutesRequest",
        })

        const { data } = await axios.get(`/admin/Institute/${UserId}`)

        dispatch({
            type: "InstitutesSuccess",
            Institute: data
        })
    } catch (error) {
        dispatch({
            type: "InstitutesFailure",
            payload: error
        })
    }
}