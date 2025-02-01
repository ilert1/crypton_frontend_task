import { create } from "zustand";

export interface UserState {
    _inited: boolean;
    setAuthData: (token: string) => void;
    logOut: () => void;
}

export const userStore = create<UserState>()((set) => ({
    _inited: false,
    setAuthData: (token: string) => {
        localStorage.setItem("token", token);
        set(() => ({ _inited: true }));
    },
    logOut: () => {
        localStorage.removeItem("token");
        set(() => ({ _inited: false }));
    },
}));
