import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAlertById } from "../api/alerts";
import AlertForm from "../components/AlertForm";
import { useAlertsStore } from "../store/alertsStore";
import type { Alert, NewAlert } from "../types/alert";

export default function EditAlertPage() {
    const { id } = useParams<{ id: string }>();
    const [alert, setAlert] = useState<Alert | null>(null);
    const [error, setError] = useState<string | null>(null);
    const editAlert = useAlertsStore((state) => state.editAlert);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        getAlertById(id)
            .then(setAlert)
            .catch(() => setError("התראה לא נמצאה"));
    }, [id]);

    async function handleSubmit(updates: NewAlert) {
        if (!id) return;

        await editAlert(id, updates);
        navigate(`/alerts/${id}`);
    }

    if (error) return <p>{error}</p>;
    if (!alert) return <p>טוען...</p>;

    return (
        <div>
            <h1>עריכת התראה</h1>
            <AlertForm initialValues={alert} onSubmit={handleSubmit} />
        </div>
    );
}
