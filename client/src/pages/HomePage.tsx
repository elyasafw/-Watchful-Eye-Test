import { useEffect, useMemo, useState } from "react";
import AlertsFilters from "../components/AlertsFilters";
import AlertsMap from "../components/AlertsMap";
import AlertsSummary from "../components/AlertsSummary";
import { useAlertsStore } from "../store/alertsStore";
import type { Arena, Priority } from "../types/alert";
import { detectThreat } from "../utils/detectThreat";
import { filterAlerts } from "../utils/filterAlerts";

export default function HomePage() {
    const allAlerts = useAlertsStore((state) => state.alerts);
    const loading = useAlertsStore((state) => state.loading);
    const error = useAlertsStore((state) => state.error);
    const fetchAlerts = useAlertsStore((state) => state.fetchAlerts);

    const [search, setSearch] = useState("");
    const [arena, setArena] = useState<Arena | "">("");
    const [priority, setPriority] = useState<Priority | "">("");

    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);

    const alerts = useMemo(
        () => filterAlerts(allAlerts, { search, arena, priority }),
        [allAlerts, search, arena, priority],
    );

    const mapAlerts = useMemo(
        () => alerts.filter((alert) => alert.status !== "Handled"),
        [alerts],
    );

    const threatDetected = useMemo(() => detectThreat(allAlerts), [allAlerts]);

    return (
        <div>
            <h1>עין צופיה</h1>

            {threatDetected && (
                <p className="threat-warning">התראת התקפה רב זירתית</p>
            )}

            <AlertsSummary alerts={alerts} />

            <AlertsFilters
                search={search}
                arena={arena}
                priority={priority}
                onSearchChange={setSearch}
                onArenaChange={setArena}
                onPriorityChange={setPriority}
            />

            {loading && <p>טוען...</p>}
            {error && <p>{error}</p>}

            <AlertsMap
                className="home-map"
                alerts={mapAlerts.map((alert) => ({
                    ...alert,
                    id: alert._id,
                }))}
            />
        </div>
    );
}
