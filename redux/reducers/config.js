import axios from "../../utils/axios"

export const GET_CONFIG = "GET_CONFIG"

const initial = {}

const reducer = (state = initial, action) => {
    switch (action.type) {
        case GET_CONFIG:
            return { ...action.config }
        default:
            return { ...state }
    }
};

export default reducer;


export const getConfig = () => async dispatch => {
    try {
        const res = await axios.get("/config")
        console.log(res)
        dispatch({
            type: GET_CONFIG,
            config: res.data.data
        })
    } catch (err) {
        return Promise.reject(err)
    }
}