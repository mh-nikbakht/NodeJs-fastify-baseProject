import { getConnection } from ".";

export const rabbitReceiver = async function (
  queue: string,
  callback: (data: any) => void,
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
          const parsedMessage: any = JSON.parse(message.content.toString());
          console.log(" [x] Received '%s'", parsedMessage);
          callback(parsedMessage);
        }
      },
      { noAck: true },
    );
    console.info("[RABBIT MQ] Waiting for messages on queue : ", queue);
  } catch (err) {
    console.warn(err);
  }
};
