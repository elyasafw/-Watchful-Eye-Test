import { useEffect, useMemo, useState } from "react";
import AlertsFilters from "../components/AlertsFilters";
import AlertsTable from "../components/AlertsTable";
import { useAlertsStore } from "../store/alertsStore";
import type { Arena, Priority } from "../types/alert";
import { filterAlerts } from "../utils/filterAlerts";

export default function AlertsListPage() {
    const allAlerts = useAlertsStore((state) => state.alerts);
    const loading = useAlertsStore((state) => state.loading);
    const error = useAlertsStore((state) => state.error);
    const fetchAlerts = useAlertsStore((state) => state.fetchAlerts);
    const removeAlert = useAlertsStore((state) => state.removeAlert);

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

    return (
        <div>
            <h1>רשימת התראות</h1>

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

            <AlertsTable alerts={alerts} onDelete={removeAlert} />
        </div>
    );
}
