import axios from "axios";

export const API_URL = `http://localhost:8080`
export const API_EMAIL_NOT_VALID = `email is not valid`
export const API_USERNAME_NOT_VALID = `username is not valid`

// TODO : на бэке глянуть, если фрештокен умер

const $api = axios.create({
    withCredentials: true, // С каждым запросом идут куки
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config!.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true; 
        try {
            const response = await axios.get(`${API_URL}/api/auth`, {withCredentials: true})
            localStorage.setItem('token',response.data.accessToken);
            return $api.request(originalRequest);
        } catch (error) {
            console.log(error);
        }
    }
    throw error;
})

export default $api