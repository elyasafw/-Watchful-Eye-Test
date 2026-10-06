import type { User } from "../types/user";

export interface UsersTableProps {
    users: User[];
    onDelete: (id: string) => void;
}

export default function UsersTable({ users, onDelete }: UsersTableProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>שם משתמש</th>
                    <th>תפקיד</th>
                    <th>זירה</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.userId}>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td>{user.assignedArena}</td>
                        <td>
                            <button onClick={() => onDelete(user.userId)}>
                                מחיקה
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
