import axios from "axios"

const client = axios.create({
    baseURL: process.env.API,
    responseType: "json"
})
client.interceptors.request.use(config => {
    config.headers["Authorization"] = JSON.parse(localStorage.getItem(`${process.env.KEY_PERSIST}:persist`))?.token
    config.headers['Access-Control-Allow-Origin'] = "*"
    return config
})

client.interceptors.response.use(response => {
    if (response.status === 401) {
        window.location.replace('/admin/login')
    }
    return response
})
export default client