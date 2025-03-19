import { Kafka } from "kafkajs";

const kafka = new Kafka({ brokers: ["localhost:9092"] });
const producer = kafka.producer();

export const publishOrderEvent = async (order: any) => {
  try {
    await producer.connect();
    await producer.send({
      topic: "order-events",
      messages: [{ value: JSON.stringify(order) }],
    });
    console.log("Order event published:", order);
  } catch (error) {
    console.error("Error publishing order event:", error);
  } finally {
    await producer.disconnect();
  }
};
