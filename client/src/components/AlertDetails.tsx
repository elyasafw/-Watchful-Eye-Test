import { Link } from "react-router-dom";
import type { Alert } from "../types/alert";
import AlertsMap from "./AlertsMap";

export function AlertDetails({ alert }: { alert: Alert }) {
    return (
        <div className="alert-details">
            <div className="alert-details-card">
                <h1>{alert.displayName}</h1>
                <p>{alert.description}</p>

                <div className="alert-details-tags">
                    <span className="tag">{alert.priority}</span>
                    <span className="tag">{alert.arena}</span>
                    <span className="tag">{alert.status}</span>
                </div>

                <Link className="btn-links" to={`/alerts/${alert._id}/edit`}>
                    עריכה
                </Link>
            </div>

            <AlertsMap
                className="alert-details-map"
                alerts={[{ ...alert, id: alert._id }]}
                height={450}
            />
        </div>
    );
}

export default AlertDetails;
