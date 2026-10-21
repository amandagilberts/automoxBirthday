import {config} from "./config.js";
import {createRabbitPublisher} from "./messaging/publisher.js";
import {createApp} from "./app.js";
console.log("Starting server...");
console.log(`Connecting to RabbitMQ at ${config.url} on queue ${config.queue}`);
const publisher = await createRabbitPublisher(config.url, config.queue);
const app = createApp(publisher);
const server = app.listen(config.apiPort, () => {
    console.log(`Server is running on port ${config.apiPort}`);
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

async function shutdown() {
    console.log("Shutting down server...");
    server.close(async () => {
        await publisher.close();
        console.log("Server and publisher closed. Exiting process.");
        process.exit(0);
    });
}