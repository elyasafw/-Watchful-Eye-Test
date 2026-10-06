import { useState, type FormEvent } from "react";
import { useAuthStore } from "../store/authStore";
import type { Arena, NewAlert } from "../types/alert";

export interface AlertFormProps {
    initialValues?: NewAlert;
    onSubmit: (alert: NewAlert) => void;
}

const BASIC_ALERT: NewAlert = {
    displayName: "",
    description: "",
    priority: "Low",
    arena: "North",
    status: "Active",
    lon: 0,
    lat: 0,
};

export default function AlertForm({ initialValues, onSubmit }: AlertFormProps) {
    const user = useAuthStore((state) => state.user);
    const isArenaUser = user?.role === "arena_user";

    const [alert, setAlert] = useState<NewAlert>(
        initialValues ??
            (isArenaUser
                ? { ...BASIC_ALERT, arena: user.assignedArena as Arena }
                : BASIC_ALERT),
    );

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSubmit(alert);
    }

    return (
        <form className="alert-form" onSubmit={handleSubmit}>
            <label>
                שם
                <input
                    required
                    value={alert.displayName}
                    onChange={(e) =>
                        setAlert({ ...alert, displayName: e.target.value })
                    }
                />
            </label>

            <label>
                תיאור
                <textarea
                    required
                    value={alert.description}
                    onChange={(e) =>
                        setAlert({ ...alert, description: e.target.value })
                    }
                />
            </label>

            <label>
                סיווג
                <select
                    value={alert.priority}
                    onChange={(e) =>
                        setAlert({
                            ...alert,
                            priority: e.target.value as NewAlert["priority"],
                        })
                    }
                >
                    <option value="Low">נמוך</option>
                    <option value="Medium">סביר</option>
                    <option value="High">גבוה</option>
                    <option value="Critical">קריטי</option>
                </select>
            </label>

            {!isArenaUser && (
                <label>
                    זירה
                    <select
                        value={alert.arena}
                        onChange={(e) =>
                            setAlert({
                                ...alert,
                                arena: e.target.value as NewAlert["arena"],
                            })
                        }
                    >
                        <option value="North">צפון</option>
                        <option value="South">דרום</option>
                        <option value="Center">מרכז</option>
                    </select>
                </label>
            )}

            <label>
                סטטוס
                <select
                    value={alert.status}
                    onChange={(e) =>
                        setAlert({
                            ...alert,
                            status: e.target.value as NewAlert["status"],
                        })
                    }
                >
                    <option value="Active">פעיל</option>
                    <option value="Handled">טופל</option>
                </select>
            </label>

            <label>
                קו אורך (lon)
                <input
                    required
                    type="number"
                    step="any"
                    value={alert.lon}
                    onChange={(e) =>
                        setAlert({ ...alert, lon: Number(e.target.value) })
                    }
                />
            </label>

            <label>
                קו רוחב (lat)
                <input
                    required
                    type="number"
                    step="any"
                    value={alert.lat}
                    onChange={(e) =>
                        setAlert({ ...alert, lat: Number(e.target.value) })
                    }
                />
            </label>

            <button type="submit">שמירה</button>
        </form>
    );
}
