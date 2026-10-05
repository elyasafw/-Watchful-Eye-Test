import { useEffect } from "react";
import { Link } from "react-router-dom";
import AlertsMap from "../components/AlertsMap";
import { useAlertsStore } from "../store/alertsStore";

export default function HomePage() {
    const alerts = useAlertsStore((state) => state.alerts);
    const loading = useAlertsStore((state) => state.loading);
    const error = useAlertsStore((state) => state.error);
    const fetchAlerts = useAlertsStore((state) => state.fetchAlerts);

    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);

    return (
        <div>
            <h1>עין צופיה</h1>

            <nav>
                <Link to="/alerts/new">התראה חדשה</Link>
                <Link to="/alerts">רשימת התראות</Link>
            </nav>

            {loading && <p>טוען...</p>}
            {error && <p>{error}</p>}

            <AlertsMap
                alerts={alerts.map((alert) => ({ ...alert, id: alert._id }))}
            />
        </div>
    );
}
