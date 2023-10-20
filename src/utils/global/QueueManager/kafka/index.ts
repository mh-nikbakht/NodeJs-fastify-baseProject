/* eslint-disable @typescript-eslint/no-unused-vars */

import { EachMessagePayload, Kafka, Partitioners } from "kafkajs";
const kafka = new Kafka({
  clientId: "user-profile-authentication",
  brokers: ["localhost:9092"],
});

let producerInstance: any = null;
let consumerInstance: any = null;

export async function initializeKafkaProducer() {
  if (!producerInstance) {
    producerInstance = kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });
    await producerInstance.connect();
  }
}

export async function sendMessageToKafkaTopic(topic: string, message: object) {
  if (producerInstance) {
    await producerInstance.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  } else {
    throw new Error("Kafka producer has not been initialized.");
  }
}

export async function closeKafkaProducer() {
  if (producerInstance) {
    await producerInstance.disconnect();
    producerInstance = null;
  }
}

export async function kafkaReceiver(
  groupId: string,
  topic: string,
  callBack: (data: any) => void,
) {
  if (!consumerInstance) {
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["localhost:9092"],
    });

    consumerInstance = kafka.consumer({ groupId });
    await consumerInstance.connect();
    await consumerInstance.subscribe({ topic, fromBeginning: true });
    console.log("Kafka listen on: ", topic, "in group :", groupId);
    await consumerInstance.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: EachMessagePayload) => {
        callBack(JSON.parse(message.value!.toString()));
      },
    });
  }
}

export async function closeKafkaConsumer() {
  if (consumerInstance) {
    await consumerInstance.disconnect();
    consumerInstance = null;
  }
}
