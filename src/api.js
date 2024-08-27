import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL
});

api.interceptors.request.use(
    (requestConfig) => { // Rename parameter to avoid conflict
        const token = localStorage.getItem(ACCESS_TOKEN);
        console.log(token)
        if (token) {
            requestConfig.headers.Authorization = `Bearer ${token}`;
        }
        return requestConfig;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;