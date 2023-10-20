import QueueReceiverInits from "../../../queue";
import { initializeKafkaProducer, sendMessageToKafkaTopic } from "./kafka";
import { initializeAMQPConnection } from "./rabbitMQ";
import RabbitSender from "./rabbitMQ/RabbitSender";

const provider = process.env.DEFAULT_QUEUE as string;
export const sendToQueue = (QueueName: string, dataToQueue: object) => {
  if (provider === "RABBITMQ") RabbitSender(QueueName, dataToQueue);
  if (provider === "KAFKA") sendMessageToKafkaTopic(QueueName, dataToQueue);
};

export const initQueueManager = () => {
  if (provider === "RABBITMQ") initializeAMQPConnection();
  if (provider === "KAFKA") initializeKafkaProducer();
};

export const listenToQueue = async () => await QueueReceiverInits(provider);
