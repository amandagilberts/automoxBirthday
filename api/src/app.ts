import express from "express";
import type {Publisher} from "./messaging/publisher.js";
import { createBirthdayRouter } from "./routes/birthday.js";
import type { BirthdayRepository } from "./db/repository.js";

export function createApp(publisher: Publisher, repository: BirthdayRepository) {
    const app = express();
    app.use(express.json());
    app.use("/birthdays", createBirthdayRouter(publisher, repository));
    app.get("/health", (req, res) => res.json({status: "ok"}))
    return app;
}