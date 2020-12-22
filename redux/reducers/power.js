import axios from "../../utils/axios"

export const GET_POWER = "GET_POWER"
export const UPDATE_PAGINATION = "POWER:UPDATE_PAGINATION"

const initial = {
    data: [],
    pagination: {
        page: 0,
        limit: 10,
        total: 0
    }
}

const reducer = (state = initial, action) => {
    switch (action.type) {
        case GET_POWER:
            return { ...state, data: action.data, pagination: action.pagination }
        case UPDATE_PAGINATION:
            return { ...state, pagination: action.data }
        default:
            return { ...state }
    }
};

export default reducer;


export const getPower = () => async dispatch => {
    try {
        const res = await axios.get("/powers")
        console.log(res)
        dispatch({
            type: GET_POWER,
            data: res.data.data,
            pagination: res.data.pagination
        })
    } catch (err) {
        return Promise.reject(err)
    }
}

export const updatePagination = data => dispatch => {
    try {
        dispatch({
            type: UPDATE_PAGINATION,
            data: data
        })
    } catch (err) {
        return Promise.reject(err)
    }
}