import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlertById } from "../api/alerts";
import AlertDetails from "../components/AlertDetails";
import type { Alert } from "../types/alert";

export default function AlertDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [alert, setAlert] = useState<Alert | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        getAlertById(id)
            .then(setAlert)
            .catch(() => setError("התראה לא נמצאה"));
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!alert) return <p>טוען...</p>;

    return <AlertDetails alert={alert} />;
}
