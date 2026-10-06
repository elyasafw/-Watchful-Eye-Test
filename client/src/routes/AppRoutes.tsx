import { Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import AdminUsersPage from "../pages/AdminUsersPage";
import AlertDetailPage from "../pages/AlertDetailPage";
import AlertsListPage from "../pages/AlertsListPage";
import EditAlertPage from "../pages/EditAlertPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NewAlertPage from "../pages/NewAlertPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/alerts" element={<AlertsListPage />} />
                    <Route path="/alerts/new" element={<NewAlertPage />} />
                    <Route path="/alerts/:id" element={<AlertDetailPage />} />
                    <Route
                        path="/alerts/:id/edit"
                        element={<EditAlertPage />}
                    />
                    <Route path="/admin/users" element={<AdminUsersPage />} />
                </Route>
            </Route>
        </Routes>
    );
}
