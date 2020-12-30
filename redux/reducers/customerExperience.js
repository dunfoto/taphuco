import axios from "../../utils/axios"

export const GET_CUSTOMER_EXPERIENCE = "GET_CUSTOMER_EXPERIENCE"
export const UPDATE_PAGINATION = "CUSTOMER_EXPERIENCE:UPDATE_PAGINATION"

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
        case GET_CUSTOMER_EXPERIENCE:
            return { ...state, data: action.data, pagination: action.pagination }
        case UPDATE_PAGINATION:
            return { ...state, pagination: action.data }
        default:
            return { ...state }
    }
};

export default reducer;


export const getCustomerExperiences = () => async (dispatch, getState) => {
    try {
        const { customerExperience: { pagination: { page, limit } } } = getState(),
            res = await axios.get(`/customer-experiences?page=${page}&limit=${limit}`)
        dispatch({
            type: GET_CUSTOMER_EXPERIENCE,
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