import express from "express";
import { z } from "zod";
import type { Publisher } from "../messaging/publisher.js";
import type { BirthdayRepository } from "../db/repository.js";
import type { BirthdayMessage } from "../types.js";
import { validateBirthdayMessage } from "../messaging/validation.js";

const idSchema = z.string().uuid();

export const createBirthdayRouter = (
  publisher: Publisher,
  repository: BirthdayRepository
) => {
  const router = express.Router();

router.post("/", async (req, res) => {
  const result = validateBirthdayMessage.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid request", details: result.error.issues });
  }
  const message: BirthdayMessage = { id: crypto.randomUUID(), ...result.data };
  try {
    await publisher.publishBirthdayMessage(message);
    return res.status(202).json({ id: message.id });
  } catch (err) {
    console.error("Publish failed:", err);
    return res.status(503).json({ error: "Message broker unavailable" });
  }
});
  router.get("/", async (_req, res) => {
    try {
      const birthdays = await repository.list();
      return res.json({ birthdays });
    } catch (err) {
      console.error("List failed:", err);
      return res.status(503).json({ error: "Database unavailable" });
    }
  });

  router.get("/:id", async (req, res) => {
    const id = idSchema.safeParse(req.params.id);
    if (!id.success) {
      return res.status(400).json({ error: "Invalid id" });
    }
    try {
      const birthday = await repository.getById(id.data);
      if (!birthday) {
        return res.status(404).json({ error: "Birthday not found" });
      }
      return res.json(birthday);
    } catch (err) {
      console.error("Lookup failed:", err);
      return res.status(503).json({ error: "Database unavailable" });
    }
  });

  return router;
};