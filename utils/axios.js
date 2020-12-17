import axios from "axios"

const client = axios.create({
    baseURL: process.env.API,
    responseType: "json"
})
client.interceptors.request.use(config => {
    config.headers["Authorization"] = JSON.parse(localStorage.getItem(`${process.env.KEY_PERSIST}:persist`))?.token
    return config
})
export default client