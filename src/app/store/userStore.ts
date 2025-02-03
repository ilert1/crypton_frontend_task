import { create } from "zustand";
import { USER_LOCALSTORAGE_KEY } from "@/shared/consts/localStorage";
import { $api } from "@/shared/api/api";

export interface UserState {
    _inited: boolean;
    token: string | null;
    isLoading: boolean;
    checkAuth: () => Promise<void>;
    setAuthData: (token: string) => void;
    logOut: () => void;
}

export const userStore = create<UserState>()(set => ({
    _inited: false,
    token: localStorage.getItem(USER_LOCALSTORAGE_KEY) ?? null,
    isLoading: true,

    // Единственный эндпоинт который позволит проверить валиден ли jwt
    // Можно декодировать на фронте, но проверка через бэкенд безопаснее
    // Я мог сразу в стейт сохранить, но не стал чтобы демонстрировать Skeleton
    checkAuth: async () => {
        const token = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (!token) {
            set(() => ({ isLoading: false }));
            return;
        }

        try {
            const response = await $api.get("/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                set(() => ({ _inited: true, token, isLoading: false }));
            } else {
                set(() => ({ _inited: false, token: null, isLoading: false }));
                localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            }
        } catch (error) {
            set(() => ({ _inited: false, token: null, isLoading: false }));
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        }
    },

    setAuthData: (token: string) => {
        localStorage.setItem(USER_LOCALSTORAGE_KEY, token);
        set(() => ({ _inited: true, token }));
    },

    logOut: () => {
        localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        set(() => ({ _inited: false, token: null }));
    }
}));
