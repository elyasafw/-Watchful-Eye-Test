import type { Alert, Arena, Priority } from "../types/alert";

export interface AlertFilters {
    search: string;
    arena: Arena | "";
    priority: Priority | "";
}

export function filterAlerts(alerts: Alert[], filters: AlertFilters): Alert[] {
    return alerts.filter((alert) => {
        const matchesSearch = alert.displayName
            .toLowerCase()
            .includes(filters.search.toLowerCase());
        const matchesArena = !filters.arena || alert.arena === filters.arena;
        const matchesPriority =
            !filters.priority || alert.priority === filters.priority;

        return matchesSearch && matchesArena && matchesPriority;
    });
}
