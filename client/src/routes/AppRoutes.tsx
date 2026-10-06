import { Route, Routes } from "react-router-dom";
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
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/alerts"
                element={
                    <ProtectedRoute>
                        <AlertsListPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/alerts/new"
                element={
                    <ProtectedRoute>
                        <NewAlertPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/alerts/:id"
                element={
                    <ProtectedRoute>
                        <AlertDetailPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/alerts/:id/edit"
                element={
                    <ProtectedRoute>
                        <EditAlertPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
