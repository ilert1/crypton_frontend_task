import axios from "axios";
import { __API__, USER_LOCALSTORAGE_KEY } from "../consts/localStorage";

export const $api = axios.create({
    baseURL: localStorage.getItem(__API__)?.toString(),
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization =
            localStorage.getItem(USER_LOCALSTORAGE_KEY) || "";
    }
    return config;
});
