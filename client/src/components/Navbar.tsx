import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function getRoleLabel(role: string) {
    if (role === "arena_user") return "חייל זירתי";
    if (role === "general_user") return "חייל כללי";
    if (role === "admin") return "מנהל מערכת";
    console.log("hi");
    return role;
}

export default function Navbar() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    if (!user) return null;

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav>
            <Link to="/">דף הבית</Link>
            <Link to="/alerts">רשימת התראות</Link>
            <Link to="/alerts/new">התראה חדשה</Link>
            {user.role === "admin" && (
                <Link to="/admin/users">ניהול משתמשים</Link>
            )}

            <span className="navbar-user">
                {user.username} ({getRoleLabel(user.role)})
            </span>

            <button className="btn-logout" onClick={handleLogout}>
                יציאה
            </button>
        </nav>
    );
}
