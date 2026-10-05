import type { Alert } from "../types/alert";
import {
    countActive,
    countByArena,
    countByPriority,
} from "../utils/alertStats";

export default function AlertsSummary({ alerts }: { alerts: Alert[] }) {
    const byPriority = countByPriority(alerts);
    const byArena = countByArena(alerts);
    const active = countActive(alerts);

    return (
        <div className="stats">
            <div className="stat-card">
                <span className="stat-label">פעילות</span>
                <span className="stat-value">{active}</span>
            </div>

            <div className="stat-card">
                <span className="stat-label">נמוך | סביר | גבוה | קריטי</span>
                <span className="stat-value">
                    {byPriority.Low} | {byPriority.Medium} | {byPriority.High} |{" "}
                    {byPriority.Critical}
                </span>
            </div>

            <div className="stat-card">
                <span className="stat-label">צפון | מרכז | דרום</span>
                <span className="stat-value">
                    {byArena.North} | {byArena.Center} | {byArena.South}
                </span>
            </div>
        </div>
    );
}
