import { Router } from "express";
import {
    createNewAlert,
    deleteAlert,
    getAlertById,
    getAllAlerts,
} from "../controllers/alerts.controller.js";
import { validateBody } from "../middleware/validatations.js";

const alertsRouter = Router();

alertsRouter.get("", getAllAlerts);

alertsRouter.get("/:id", getAlertById);

alertsRouter.post(
    "",
    validateBody(
        "displayName",
        "description",
        "priority",
        "arena",
        "status",
        "lon",
        "lat",
    ),
    createNewAlert,
);

alertsRouter.delete("/:id", deleteAlert);

alertsRouter.put("/:id", async (req, res) => {});

export default alertsRouter;
