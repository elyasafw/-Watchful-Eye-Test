import type { NewUser, User } from "../types/user";
import { addAuthHeaders, apiClient } from "./api";

export async function login(username: string, password: string) {
    const res = await apiClient.post("/auth/login", { username, password });
    return res.data as { token: string; user: User };
}

export async function getMe(): Promise<User> {
    const res = await apiClient.get("/auth/me", { headers: addAuthHeaders() });
    return res.data.data;
}

export async function register(user: NewUser) {
    const res = await apiClient.post("/auth/register", user, {
        headers: addAuthHeaders(),
    });
    return res.data;
}

export async function getAllUsers(): Promise<User[]> {
    const res = await apiClient.get("/auth/users", {
        headers: addAuthHeaders(),
    });
    return res.data.data;
}

export async function deleteUser(id: string) {
    const res = await apiClient.delete(`/auth/users/${id}`, {
        headers: addAuthHeaders(),
    });
    return res.data;
}
