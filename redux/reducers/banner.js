import axios from "../../utils/axios"

export const GET_BANNERS = "GET_BANNERS"

const initial = {
    banners: []
}

const reducer = (state = initial, action) => {
    switch (action.type) {
        case GET_BANNERS:
            return { ...state, banners: action.banners }
        default:
            return { ...state }
    }
};

export default reducer;


export const getBanners = () => async dispatch => {
    try {
        const res = await axios.get("/banners")
        dispatch({
            type: GET_BANNERS,
            banners: res.data.data
        })
    } catch (err) {
        return Promise.reject(err)
    }
}