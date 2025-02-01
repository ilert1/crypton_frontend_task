import { create } from "zustand";

export interface User {
    id: string;
    email: string;
}

export interface UserState {
    authData: User | object;
    _inited: boolean;
    setAuthData: (user: User) => void;
    initAuthData: () => void;
    logOut: () => void;
}

export const userStore = create<UserState>()((set) => ({
    authData: {},
    _inited: false,
    setAuthData: (user: User) => {
        set(() => ({ authData: user }));
    },
    initAuthData: () => {},
    logOut: () => {},
}));
