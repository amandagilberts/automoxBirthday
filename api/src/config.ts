import "dotenv/config";
export const config = {
    rabbit: {
    port: Number(process.env.RABBITMQ_PORT) || 5672,
    apiPort: Number(process.env.API_PORT) || 3000,
    url: process.env.RABBITMQ_URL || "amqp://user:password@localhost:5672",
    hostname: process.env.RABBITMQ_HOSTNAME || "localhost",
    username: process.env.RABBITMQ_USERNAME || "user",
    password: process.env.RABBITMQ_PASSWORD || "password",
    queue: process.env.RABBITMQ_QUEUE || "birthday_queue",},
    db: {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "birthdays",
  password: process.env.DB_PASSWORD || "birthdays",
  database: process.env.DB_NAME || "birthdays",
},
};

