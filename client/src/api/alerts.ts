import type { Alert, NewAlert, UpdateAlert } from "../types/alert";
import { apiClient } from "./client";

export async function getAllAlerts(): Promise<Alert[]> {
    const res = await apiClient.get("/alerts");
    return res.data.data;
}

export async function getAlertById(id: string): Promise<Alert> {
    const res = await apiClient.get(`/alerts/${id}`);
    return res.data.data;
}

export async function createAlert(alert: NewAlert) {
    const res = await apiClient.post("/alerts", alert);
    return res.data;
}

export async function deleteAlert(id: string) {
    const res = await apiClient.delete(`/alerts/${id}`);
    return res.data;
}

export async function updateAlert(id: string, updates: UpdateAlert) {
    const res = await apiClient.put(`/alerts/${id}`, updates);
    return res.data;
}
