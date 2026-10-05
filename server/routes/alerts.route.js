import { Router } from "express";
import { validateBody } from "../middleware/validatations.js";

const alertsRouter = Router();

alertsRouter.get("", async (req, res) => {});

alertsRouter.get("/:id", async (req, res) => {});

alertsRouter.post(
    "",
    validateBody([
        "displayName",
        "description",
        "priority",
        "arena",
        "status",
        "lon",
        "lat",
    ]),
    async (req, res) => {},
);

alertsRouter.delete("/:id", async (req, res) => {});

alertsRouter.put("/:id", async (req, res) => {});

export default alertsRouter;
