import { Router } from "express";
import {
    createNewAlert,
    deleteAlert,
    getAlertById,
    getAllAlerts,
    updateAlert,
} from "../controllers/alerts.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import {
    validateCreateAlert,
    validateUpdateAlert,
} from "../middleware/validatations.js";

const alertsRouter = Router();

alertsRouter.use(authMiddleware);

alertsRouter.get("", getAllAlerts);

alertsRouter.get("/:id", getAlertById);

alertsRouter.post("", validateCreateAlert, createNewAlert);

alertsRouter.delete("/:id", deleteAlert);

alertsRouter.put("/:id", validateUpdateAlert, updateAlert);

export default alertsRouter;
