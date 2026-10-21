import amqp from "amqplib";
import type { BirthdayMessage } from "../types.js";

export interface Publisher {
    publishBirthdayMessage(message: BirthdayMessage): Promise<void>;
    close(): Promise<void>;

}
export async function createRabbitPublisher(
    url: string,
    queueName: string ): Promise<Publisher> {

    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    connection.on("error", (err) => {
        console.error("RabbitMQ connection error:", err);
    });
    connection.on("close", () => {
        console.warn("RabbitMQ connection closed");
    });

    return {
        async publishBirthdayMessage(message) {
            const ok = channel.sendToQueue(
                queueName, 
                Buffer.from(JSON.stringify(message)), 
                { persistent: true , 
                    contentType: "application/json" });
                    if (!ok) {
                        console.warn("Message was not sent to queue, the buffer is full.");
                    }
        },
        async close() {
            await channel.close();
            await connection.close();
        }
    };
}