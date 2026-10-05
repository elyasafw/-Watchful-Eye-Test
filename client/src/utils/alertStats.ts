import type { Alert } from "../types/alert";

export function countByPriority(alerts: Alert[]) {
    return {
        Low: alerts.filter((a) => a.priority === "Low").length,
        Medium: alerts.filter((a) => a.priority === "Medium").length,
        High: alerts.filter((a) => a.priority === "High").length,
        Critical: alerts.filter((a) => a.priority === "Critical").length,
    };
}

export function countByArena(alerts: Alert[]) {
    return {
        North: alerts.filter((a) => a.arena === "North").length,
        South: alerts.filter((a) => a.arena === "South").length,
        Center: alerts.filter((a) => a.arena === "Center").length,
    };
}

export function countActive(alerts: Alert[]): number {
    return alerts.filter((a) => a.status === "Active").length;
}
