import { alertsCol } from "../db.js";
import { createRepository } from "../repository/db.repo.js";
import { createService } from "../services/alerts.service.js";

const repository = createRepository(alertsCol);
const alertsService = createService(repository);

export async function createNewAlert(alert, res) {
    const result = await alertsService.createNew(alert);

    res.status(201).json({ success: true, message: "התראה חדשה נוצרה בהצלחה" });
}
