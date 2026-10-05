import { Route, Routes } from "react-router-dom";
import AlertsListPage from "../pages/AlertsListPage";
import HomePage from "../pages/HomePage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/alerts" element={<AlertsListPage />} />
        </Routes>
    );
}
