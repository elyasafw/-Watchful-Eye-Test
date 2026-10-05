import cors from "cors";
import express from "express";

export function createApp() {
    const app = express();

    app.use(cors(), express.json());

    app.get("/api/health", (req, res) => {
        res.on({ ok: true });
    });

    return app;
}
