import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from "../consts/localStorage";

export const $api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization =
            localStorage.getItem(USER_LOCALSTORAGE_KEY) || "";
    }
    return config;
});
