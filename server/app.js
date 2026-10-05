import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errors";
import alertsRouter from "./routes/alerts.route";

export function createApp() {
    const app = express();

    app.use(cors(), express.json());

    app.get("/api/health", (req, res) => {
        res.on({ ok: true });
    });

    app.use("/api/alerts", alertsRouter);

    app.use(errorHandler);

    return app;
}
