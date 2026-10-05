import { Link } from "react-router-dom";
import type { Alert } from "../types/alert";

export interface AlertsTableProps {
    alerts: Alert[];
    onDelete: (id: string) => void;
}

export default function AlertsTable({ alerts, onDelete }: AlertsTableProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>שם</th>
                    <th>סיווג</th>
                    <th>זירה</th>
                    <th>סטטוס</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {alerts.map((alert) => (
                    <tr key={alert._id}>
                        <td>
                            <Link to={`/alerts/${alert._id}`}>
                                {alert.displayName}
                            </Link>
                        </td>
                        <td>{alert.priority}</td>
                        <td>{alert.arena}</td>
                        <td>{alert.status}</td>
                        <td>
                            <button onClick={() => onDelete(alert._id)}>
                                מחיקה
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
