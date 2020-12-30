import axios from "../../utils/axios"

export const GET_HISTORIES = "GET_HISTORIES"
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
        case GET_HISTORIES:
            return { ...state, data: action.data, pagination: action.pagination }
        case UPDATE_PAGINATION:
            return { ...state, pagination: action.data }
        default:
            return { ...state }
    }
};

export default reducer;


export const getHistories = () => async (dispatch, getState) => {
    try {
        const { history: { pagination: { page, limit } } } = getState(),
            res = await axios.get(`/histories?page=${page}&limit=${limit}`)
        dispatch({
            type: GET_HISTORIES,
            data: res.data.data,
            pagination: {
                page: Number(res.data.pagination.page),
                total: Number(res.data.pagination.total),
                limit: Number(res.data.pagination.limit)
            }
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