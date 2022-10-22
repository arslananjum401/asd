export const setSocketA = (socket) => async (dispatch) => {
    try {
        dispatch({
            type: "SetupSocket",
            payload: socket
        })
    } catch (error) {
console.log(error)
    }
}