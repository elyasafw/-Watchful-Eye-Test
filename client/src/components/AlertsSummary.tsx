import type { Alert } from "../types/alert";
import { countActive, countByArena, countByPriority } from "../utils/alertStats";

export default function AlertsSummary({ alerts }: { alerts: Alert[] }) {
    const byPriority = countByPriority(alerts);
    const byArena = countByArena(alerts);
    const active = countActive(alerts);

    return (
        <div>
            <p>פעילות: {active}</p>

            <p>
                נמוך: {byPriority.Low} | סביר: {byPriority.Medium} | גבוה:{" "}
                {byPriority.High} | קריטי: {byPriority.Critical}
            </p>

            <p>
                צפון: {byArena.North} | מרכז: {byArena.Center} | דרום:{" "}
                {byArena.South}
            </p>
        </div>
    );
}
