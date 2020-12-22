import axios from "../../utils/axios"

export const GET_CATEGORIES = "GET_CATEGORIES"
export const UPDATE_PAGINATION = "CATEGORY:UPDATE_PAGINATION"

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
        case GET_CATEGORIES:
            return { ...state, data: action.data, pagination: action.pagination }
        case UPDATE_PAGINATION:
            return { ...state, pagination: action.data }
        default:
            return { ...state }
    }
};

export default reducer;


export const getCategories = () => async dispatch => {
    try {
        const res = await axios.get("/categories")
        dispatch({
            type: GET_CATEGORIES,
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