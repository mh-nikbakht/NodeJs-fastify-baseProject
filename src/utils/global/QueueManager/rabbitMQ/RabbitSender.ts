import { getConnection } from ".";
export const RabbitSender = async function name(queue: string, data: object) {
  try {
    const connection = getConnection();
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    console.log(" [x] Sent '%s'", data);
    await channel.close();
  } catch (err: any) {
    console.warn(err.message);
  }
};
export default RabbitSender;
