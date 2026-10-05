import { useNavigate } from "react-router-dom";
import AlertForm from "../components/AlertForm";
import { useAlertsStore } from "../store/alertsStore";
import type { NewAlert } from "../types/alert";

export default function NewAlertPage() {
    const addAlert = useAlertsStore((state) => state.addAlert);
    const navigate = useNavigate();

    async function handleSubmit(alert: NewAlert) {
        await addAlert(alert);
        navigate("/");
    }

    return (
        <div>
            <h1>התראה חדשה</h1>
            <AlertForm onSubmit={handleSubmit} />
        </div>
    );
}
