import { Link } from "react-router-dom";
import type { Alert } from "../types/alert";
import AlertsMap from "./AlertsMap";

export function AlertDetails({ alert }: { alert: Alert }) {
    return (
        <div>
            <h1>{alert.displayName}</h1>
            <p>תיאור: {alert.description}</p>
            <p>סיווג: {alert.priority}</p>
            <p>זירה: {alert.arena}</p>
            <p>סטטוס: {alert.status}</p>

            <Link to={`/alerts/${alert._id}/edit`}>עריכה</Link>

            <AlertsMap alerts={[{ ...alert, id: alert._id }]} height={400} />
        </div>
    );
}

export default AlertDetails;
