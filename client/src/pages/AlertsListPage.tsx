import { useEffect } from "react";
import AlertsTable from "../components/AlertsTable";
import { useAlertsStore } from "../store/alertsStore";

export default function AlertsListPage() {
    const alerts = useAlertsStore((state) => state.alerts);
    const loading = useAlertsStore((state) => state.loading);
    const error = useAlertsStore((state) => state.error);
    const fetchAlerts = useAlertsStore((state) => state.fetchAlerts);
    const removeAlert = useAlertsStore((state) => state.removeAlert);

    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);

    return (
        <div>
            <h1>רשימת התראות</h1>

            {loading && <p>טוען...</p>}
            {error && <p>{error}</p>}

            <AlertsTable alerts={alerts} onDelete={removeAlert} />
        </div>
    );
}
