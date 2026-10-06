import type { Alert, NewAlert, UpdateAlert } from "../types/alert";
import { addAuthHeaders, apiClient } from "./api";

export async function getAllAlerts(): Promise<Alert[]> {
    const res = await apiClient.get("/alerts", { headers: addAuthHeaders() });
    return res.data.data;
}

export async function getAlertById(id: string): Promise<Alert> {
    const res = await apiClient.get(`/alerts/${id}`, {
        headers: addAuthHeaders(),
    });
    return res.data.data;
}

export async function createAlert(alert: NewAlert) {
    const res = await apiClient.post("/alerts", alert, {
        headers: addAuthHeaders(),
    });
    return res.data;
}

export async function deleteAlert(id: string) {
    const res = await apiClient.delete(`/alerts/${id}`, {
        headers: addAuthHeaders(),
    });
    return res.data;
}

export async function updateAlert(id: string, updates: UpdateAlert) {
    const res = await apiClient.put(`/alerts/${id}`, updates, {
        headers: addAuthHeaders(),
    });
    return res.data;
}
