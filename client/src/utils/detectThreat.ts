import type { Alert } from "../types/alert";

const TIME_WINDOW_MS = 5 * 60 * 1000;

function isCurrentCriticalArena(alerts: Alert[], arena: string): boolean {
    return alerts.some(
        (alert) =>
            alert.arena === arena &&
            alert.priority === "Critical" &&
            alert.status === "Active" &&
            Date.now() - alert.createdAt <= TIME_WINDOW_MS,
    );
}

export function detectThreat(alerts: Alert[]): boolean {
    const hasNorth = isCurrentCriticalArena(alerts, "North");
    const hasSouth = isCurrentCriticalArena(alerts, "South");
    const hasCenter = isCurrentCriticalArena(alerts, "Center");

    return hasNorth && hasSouth && hasCenter;
}
