import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errors";

export function createApp() {
    const app = express();

    app.use(cors(), express.json());

    app.get("/api/health", (req, res) => {
        res.on({ ok: true });
    });

    app.use(errorHandler);

    return app;
}
