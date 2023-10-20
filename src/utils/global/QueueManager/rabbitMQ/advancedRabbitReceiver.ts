import { getConnection } from ".";

export const AdvancedRabbitReceiver = async function (
  queue: string,
  customReplay: any,
) {
  try {
    const connection = getConnection();
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });
    await channel.assertQueue(queue, { durable: false });
    await channel.consume(
      queue,
      (message: any) => {
        if (message) {
          console.log(
            "[RABBIT MQ] Received on queue :",
            queue,
            "\n",
            "data : ",
            JSON.parse(message.content.toString()),
          );
          // Use the callback function to generate the custom reply
          const customReply = customReplay(message.content.toString());
          // Send the custom reply back to the dynamic replyTo queue
          channel.sendToQueue(
            message.properties.replyTo,
            Buffer.from(customReply),
            { correlationId: message.properties.correlationId },
          );
        }
      },
      { noAck: true },
    );
    console.info("[RABBIT MQ] Waiting for messages on queue : ", queue);
  } catch (err) {
    console.warn(err);
  }
};
