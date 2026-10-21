   import express from "express";
    import { validateBirthdayMessage } from "../messaging/validation.js";
    import type error from "zod";
    import type { BirthdayMessage } from "../types.js";
    import type { Publisher } from "../messaging/publisher.js";
    
    export const createBirthdayRouter = (publisher: Publisher) => {
 
    const router = express.Router();
    
    router.post("/", async (req, res) => {  
        const message: BirthdayMessage = {
            name: req.body.name,
            birthday: req.body.birthday,
            id: crypto.randomUUID(),
        };
       
            const validationResult = validateBirthdayMessage.safeParse(message);
            if (!validationResult.success) {
                throw new Error(`Invalid message format: ${validationResult.error}`);
            }
        try {
            await publisher.publishBirthdayMessage(message);
            res.status(200).json({ status: "Message published successfully with this id: " , id: message.id });
        } catch (error) {
            console.error("Error publishing message:", error);
            res.status(500).json({ status: "Error publishing message", error: "Message could not be published" });
        }
    });

    return router;
}
