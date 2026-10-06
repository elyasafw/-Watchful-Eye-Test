import { useState, type FormEvent } from "react";
import type { NewUser } from "../types/user";

export interface UserFormProps {
    onSubmit: (user: NewUser) => void;
    error?: string | null;
}

const EMPTY_USER: NewUser = {
    username: "",
    password: "",
    email: "",
    role: "arena_user",
    assignedArena: "North",
};

export function UserForm({ onSubmit, error }: UserFormProps) {
    const [newUser, setNewUser] = useState<NewUser>(EMPTY_USER);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSubmit(newUser);
    }

    return (
        <div className="user-form">
            <h2>משתמש חדש</h2>

            <form className="alert-form" onSubmit={handleSubmit}>
                <label>
                    שם משתמש
                    <input
                        required
                        minLength={2}
                        value={newUser.username}
                        onChange={(e) =>
                            setNewUser({
                                ...newUser,
                                username: e.target.value,
                            })
                        }
                    />
                </label>

                <label>
                    סיסמה
                    <input
                        required
                        type="password"
                        minLength={8}
                        maxLength={14}
                        value={newUser.password}
                        onChange={(e) =>
                            setNewUser({
                                ...newUser,
                                password: e.target.value,
                            })
                        }
                    />
                </label>

                <label>
                    אימייל
                    <input
                        required
                        type="email"
                        value={newUser.email}
                        onChange={(e) =>
                            setNewUser({ ...newUser, email: e.target.value })
                        }
                    />
                </label>

                <label>
                    תפקיד
                    <select
                        value={newUser.role}
                        onChange={(e) => {
                            const role = e.target.value as NewUser["role"];
                            const isArenaRestricted = role === "arena_user";

                            setNewUser({
                                ...newUser,
                                role,
                                assignedArena: isArenaRestricted
                                    ? "North"
                                    : "All",
                            });
                        }}
                    >
                        <option value="arena_user">חייל זירתי</option>
                        <option value="general_user">חייל כללי</option>
                        <option value="admin">מנהל מערכת</option>
                    </select>
                </label>

                <label>
                    זירה משויכת
                    <select
                        value={newUser.assignedArena}
                        onChange={(e) =>
                            setNewUser({
                                ...newUser,
                                assignedArena: e.target
                                    .value as NewUser["assignedArena"],
                            })
                        }
                    >
                        {!["admin", "general_user"].includes(newUser.role) ? (
                            <option value="North">צפון</option>
                        ) : (
                            ""
                        )}
                        {!["admin", "general_user"].includes(newUser.role) ? (
                            <option value="South">דרום</option>
                        ) : (
                            ""
                        )}
                        {!["admin", "general_user"].includes(newUser.role) ? (
                            <option value="Center">מרכז</option>
                        ) : (
                            ""
                        )}
                        {["admin", "general_user"].includes(newUser.role) ? (
                            <option value="All">הכל</option>
                        ) : (
                            ""
                        )}
                    </select>
                </label>

                {error && <p>{error}</p>}

                <button type="submit">יצירה</button>
            </form>
        </div>
    );
}

export default UserForm;
