import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:3001/api",
});

export function addAuthHeaders() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}
