import { Route, Routes } from "react-router-dom";
import AlertDetailPage from "../pages/AlertDetailPage";
import AlertsListPage from "../pages/AlertsListPage";
import EditAlertPage from "../pages/EditAlertPage";
import HomePage from "../pages/HomePage";
import NewAlertPage from "../pages/NewAlertPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/alerts" element={<AlertsListPage />} />
            <Route path="/alerts/new" element={<NewAlertPage />} />
            <Route path="/alerts/:id" element={<AlertDetailPage />} />
            <Route path="/alerts/:id/edit" element={<EditAlertPage />} />
        </Routes>
    );
}
