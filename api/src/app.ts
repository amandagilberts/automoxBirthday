import express from "express";
import type {Publisher} from "./messaging/publisher.js";
import { createBirthdayRouter } from "./routes/birthday.js";

export function createApp(publisher: Publisher) {
    const app = express();
    app.use(express.json());
    app.use("/birthday", createBirthdayRouter(publisher));
    app.get("/health", (req, res) => res.json({status: "ok"}))
    app.use("/birthdays", createBirthdayRouter(publisher));
    return app;
}