import { useEffect, useState } from "react";
import * as authApi from "../api/auth";
import UserForm from "../components/UserForm";
import UsersTable from "../components/UsersTable";
import { useAuthStore } from "../store/authStore";
import type { NewUser, User } from "../types/user";
import { getErrorMessage } from "../utils/getErrorMessage";

export default function AdminUsersPage() {
    const currentUser = useAuthStore((state) => state.user);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    async function fetchUsers() {
        const data = await authApi.getAllUsers();
        setUsers(data);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if (currentUser?.role !== "admin") {
        return <p>אין לך הרשאה לצפות בעמוד זה</p>;
    }

    async function handleCreate(user: NewUser) {
        setError(null);

        try {
            await authApi.register(user);
            await fetchUsers();
        } catch (err) {
            setError(getErrorMessage(err, "יצירת המשתמש נכשלה"));
        }
    }

    async function handleDelete(id: string) {
        await authApi.deleteUser(id);
        await fetchUsers();
    }

    return (
        <div>
            <h1>ניהול משתמשים</h1>

            <UsersTable users={users} onDelete={handleDelete} />

            <UserForm onSubmit={handleCreate} error={error} />
        </div>
    );
}
