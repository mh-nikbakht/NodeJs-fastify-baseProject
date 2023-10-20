import { kafkaReceiver } from "../utils/global/QueueManager/kafka";
import { rabbitReceiver } from "../utils/global/QueueManager/rabbitMQ/rabbitReceiver";
import testReceiverCallbackFunc from "./services/testReceiver";

export default async function QueueReceiverInits(provider: string) {
	if (provider === "RABBITMQ") {
		await rabbitReceiver("getUserById", testReceiverCallbackFunc);
	}
	if (provider === "KAFKA") {
		await kafkaReceiver("GroupId", "getUserById", testReceiverCallbackFunc);
	}
}
