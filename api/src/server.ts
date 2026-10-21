import {config} from "./config.js";
import {createRabbitPublisher} from "./messaging/publisher.js";
import {createApp} from "./app.js";

import pg from "pg";
import { createPgRepository } from "./db/repository.js";
console.log("Starting server...");
console.log(`Connecting to RabbitMQ at ${config.rabbit.url} on queue ${config.rabbit.queue}`);
const publisher = await createRabbitPublisher(config.rabbit.url, config.rabbit.queue);


process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

const pool = new pg.Pool(config.db);   // adjust to however your config is shaped
pool.on("error", (err) => console.error("Postgres pool error:", err));

const app = createApp(publisher, createPgRepository(pool));
const server = app.listen(config.rabbit.apiPort, () => {
    console.log(`Server is running on port ${config.rabbit.apiPort}`);
});
async function shutdown() {
    console.log("Shutting down server...");
    server.close(async () => {
        await publisher.close();
        await pool.end();
        console.log("Server and publisher closed. Exiting process.");
        process.exit(0);
    });
}