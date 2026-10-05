import { Route, Routes } from "react-router-dom";
import AlertsListPage from "../pages/AlertsListPage";
import HomePage from "../pages/HomePage";
import NewAlertPage from "../pages/NewAlertPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/alerts" element={<AlertsListPage />} />
            <Route path="/alerts/new" element={<NewAlertPage />} />
        </Routes>
    );
}
