import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errors.js";
import alertsRouter from "./routes/alerts.route.js";

export function createApp() {
    const app = express();

    app.use(cors(), express.json());

    app.get("/api/health", (req, res) => {
        res.json({ ok: true });
    });

    app.use("/api/alerts", alertsRouter);

    app.use(errorHandler);

    return app;
}
