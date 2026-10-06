import { alertsCol } from "../db.js";
import { createRepository } from "../repository/db.repo.js";
import { createAlertsService } from "../services/alerts.service.js";

const alertsRepository = createRepository(alertsCol);
const alertsService = createAlertsService(alertsRepository);

export async function createNewAlert(req, res) {
    const result = await alertsService.createNew(req.body);

    res.status(201).json({ success: true, message: "התראה חדשה נוצרה בהצלחה" });
}

export async function getAllAlerts(req, res) {
    const alerts = await alertsService.getAll();

    res.json({ success: true, data: alerts });
}

export async function getAlertById(req, res) {
    const alert = await alertsService.getById(req.params.id);

    if (!alert) {
        return res.status(404).json({ error: "התראה לא נמצאה" });
    }

    res.json({ success: true, data: alert });
}

export async function deleteAlert(req, res) {
    await alertsService.remove(req.params.id);

    res.json({ success: true, message: "התראה נמחקה בהצלחה" });
}

export async function updateAlert(req, res) {
    const matchedes = await alertsService.update(req.params.id, req.body);

    if (!matchedes) {
        return res.status(404).json({ error: "התראה לא נמצאה" });
    }

    res.json({ success: true, message: "התראה עודכנה בהצלחה" });
}
