import { create } from "zustand";
import * as authApi from "../api/auth";
import type { User } from "../types/user";

interface AuthState {
    token: string | null;
    user: User | null;

    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user") ?? "null"),

    login: async (username, password) => {
        const { token, user } = await authApi.login(username, password);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        set({ token, user });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        set({ token: null, user: null });
    },
}));
