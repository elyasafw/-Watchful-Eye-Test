import { alertsCol } from "../db.js";
import { createRepository } from "../repository/db.repo.js";
import { createService } from "../services/alerts.service.js";

const repository = createRepository(alertsCol);
const alertsService = createService(repository);

export async function createNewAlert(req, res) {
    const result = await alertsService.createNew(req.body);

    res.status(201).json({ success: true, message: "התראה חדשה נוצרה בהצלחה" });
}

export async function getAllAlerts(req, res) {
    const alerts = await alertsService.getAll();

    res.json({ success: true, data: alerts });
}

