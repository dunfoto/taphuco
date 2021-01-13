import axios from "../../utils/axios"

export const GET_AUTHENTICATION = "GET_AUTHENTICATION"
export const LOGOUT_AUTHENTICATION = "LOGOUT_AUTHENTICATION"
export const PERSIST_LOAD = "PERSIST_LOAD"

const initial = {
    token: undefined,
    current: undefined
}
const reducer = (state = initial, action) => {
    switch (action.type) {
        case GET_AUTHENTICATION:
            window.localStorage.setItem(`${process.env.KEY_PERSIST}:persist`, JSON.stringify({ token: action.token, current: action.current }))
            return { ...state, token: action.token, current: action.current }
        case LOGOUT_AUTHENTICATION:
            window.localStorage.removeItem(`${process.env.KEY_PERSIST}:persist`)
            return { ...state, token: undefined, current: undefined }
        case PERSIST_LOAD:
            return { ...state, token: action.token, current: action.current }
        default:
            return { ...state }
    }
};

export default reducer;


export const login = (data, cb) => async dispatch => {
    try {
        const res = await axios.post("/login/admin", data)
        console.log(res.data.token)
        await dispatch({
            type: GET_AUTHENTICATION,
            token: res.data.token,
            current: res.data.data
        })
        cb(null, res.data)
    } catch (err) {
        return cb(err, null)
    }
}

export const logout = () => dispatch => {
    try {
        dispatch({
            type: LOGOUT_AUTHENTICATION
        })
    } catch (err) {
        return Promise.reject(err)
    }
}