// amqpService.js
import amqp from "amqplib";
import { rabbitConfig } from "../../../../configs/rabbitConfig";

let connection: any = null;

export async function initializeAMQPConnection() {
  if (!connection) {
    connection = await amqp.connect(rabbitConfig.rabbitmq.url);
  }
}

export function getConnection() {
  if (connection) {
    return connection;
  }
  throw new Error("AMQP connection has not been initialized.");
}

export async function closeAMQPConnection() {
  if (connection) {
    await connection.close();
    connection = null;
  }
}
