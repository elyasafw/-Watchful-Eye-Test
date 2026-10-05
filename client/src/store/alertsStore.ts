import { create } from "zustand";
import * as alertsApi from "../api/alerts";
import type { Alert, UpdateAlert } from "../types/alert";

interface AlertsState {
    alerts: Alert[];
    loading: boolean;
    error: string | null;

    fetchAlerts: () => Promise<void>;
    addAlert: (
        alert: Parameters<typeof alertsApi.createAlert>[0],
    ) => Promise<void>;
    removeAlert: (id: string) => Promise<void>;
    editAlert: (id: string, updates: UpdateAlert) => Promise<void>;
}

export const useAlertsStore = create<AlertsState>((set, get) => ({
    alerts: [],
    loading: false,
    error: null,

    fetchAlerts: async () => {
        set({ loading: true, error: null });
        try {
            const alerts = await alertsApi.getAllAlerts();
            set({ alerts, loading: false });
        } catch {
            set({ error: "שגיאה בטעינת ההתראות", loading: false });
        }
    },

    addAlert: async (alert) => {
        await alertsApi.createAlert(alert);
        await get().fetchAlerts();
    },

    removeAlert: async (id) => {
        await alertsApi.deleteAlert(id);
        set({ alerts: get().alerts.filter((a) => a._id !== id) });
    },

    editAlert: async (id, updates) => {
        await alertsApi.updateAlert(id, updates);
        await get().fetchAlerts();
    },
}));
