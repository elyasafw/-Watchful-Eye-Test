import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);

        try {
            await login(username, password);
            navigate("/");
        } catch {
            setError("שם משתמש או סיסמה שגויים");
        }
    }

    return (
        <div>
            <h1>התחברות</h1>

            <form className="alert-form" onSubmit={handleSubmit}>
                <label>
                    שם משתמש
                    <input
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                <label>
                    סיסמה
                    <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                {error && <p>{error}</p>}

                <button type="submit">התחבר</button>
            </form>
        </div>
    );
}
