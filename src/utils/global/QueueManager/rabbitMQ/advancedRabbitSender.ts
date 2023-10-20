import { v4 } from "uuid";
import { getConnection } from ".";

export const AdvancedRabbitSender = async function name(
  queue: string,
  data: any,
) {
  let returningData: any;
  try {
    const channel = await getConnection().createChannel();
    await channel.assertQueue(queue, { durable: false });

    const correlationId = v4(); // Generate a unique correlationId
    const replyToQueue = "amq.rabbitmq.reply-to";

    const replyPromise = new Promise<void>((resolve) => {
      channel.consume(
        replyToQueue,
        (msg: any) => {
          if (msg && msg.properties.correlationId === correlationId) {
            console.log(
              "[RABBIT MQ] Received reply from queue : ",
              queue,
              "\n",
              "data : ",
              msg.content.toString(),
            );
            returningData = JSON.parse(msg.content.toString());
            resolve();
          }
        },
        { noAck: true },
      );
    });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
      correlationId,
      replyTo: replyToQueue,
    });
    console.log(
      "[RABBIT MQ] Sent data to queue : ",
      queue,
      "\n",
      "data : ",
      data,
    );

    await replyPromise;
    await channel.close();
  } catch (err: any) {
    console.warn(err.message);
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return returningData;
  }
};
