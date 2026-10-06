import { alertsCol } from "../db.js";
import { createRepository } from "../repository/db.repo.js";
import { createAlertsService } from "../services/alerts.service.js";

const alertsRepository = createRepository(alertsCol);
const alertsService = createAlertsService(alertsRepository);

export async function createNewAlert(req, res) {
    const newAlert = { ...req.body };

    if (req.user.role === "arena_user") {
        newAlert.arena = req.user.assignedArena;
    }

    const result = await alertsService.createNew(newAlert);

    res.status(201).json({ success: true, message: "התראה חדשה נוצרה בהצלחה" });
}

export async function getAllAlerts(req, res) {
    const alerts = await alertsService.getAll();

    if (req.user.role === "arena_user") {
        const ownAlerts = alerts.filter(
            (alert) => alert.arena === req.user.assignedArena,
        );
        return res.json({ success: true, data: ownAlerts });
    }

    res.json({ success: true, data: alerts });
}

export async function getAlertById(req, res) {
    const alert = await alertsService.getById(req.params.id);

    if (!alert) {
        return res.status(404).json({ error: "התראה לא נמצאה" });
    }

    if (
        req.user.role === "arena_user" &&
        alert.arena !== req.user.assignedArena
    ) {
        return res
            .status(403)
            .json({ error: "אין הרשאה לצפות בהתראה מזירה אחרת" });
    }

    res.json({ success: true, data: alert });
}

export async function deleteAlert(req, res) {
    if (req.user.role === "arena_user") {
        const alert = await alertsService.getById(req.params.id);

        if (!alert) {
            return res.status(404).json({ error: "התראה לא נמצאה" });
        }
        if (alert.arena !== req.user.assignedArena) {
            return res
                .status(403)
                .json({ error: "אין הרשאה למחוק התראה מזירה אחרת" });
        }
    }

    await alertsService.remove(req.params.id);

    res.json({ success: true, message: "התראה נמחקה בהצלחה" });
}

export async function updateAlert(req, res) {
    const updates = { ...req.body };

    if (req.user.role === "arena_user") {
        const alert = await alertsService.getById(req.params.id);

        if (!alert) {
            return res.status(404).json({ error: "התראה לא נמצאה" });
        }
        if (alert.arena !== req.user.assignedArena) {
            return res
                .status(403)
                .json({ error: "אין הרשאה לעדכן התראה מזירה אחרת" });
        }

        updates.arena = req.user.assignedArena;
    }

    const matchedes = await alertsService.update(req.params.id, updates);

    if (!matchedes) {
        return res.status(404).json({ error: "התראה לא נמצאה" });
    }

    res.json({ success: true, message: "התראה עודכנה בהצלחה" });
}
