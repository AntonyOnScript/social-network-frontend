import axios from "axios"
import store from "../store/store"

const http = axios.create({
    baseURL: `${process.env.VUE_APP_API_ENDPOINT}`
})

http.interceptors.request.use(function (config) {
    if(store.state.token) {
        config.headers.authorization = `Bearer ${store.state.token}`
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

export default http