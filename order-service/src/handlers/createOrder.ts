import { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { publishOrderEvent } from "./orderEvent";

const db = new DynamoDB.DocumentClient();

export const handler = async () => {
  const order = { id: uuidv4(), status: "PENDING" };

  // Save order to DynamoDB
  await db.put({ TableName: "orders", Item: order }).promise();

  // Publish event to Kafka
  await publishOrderEvent(order);

  return { statusCode: 200, body: JSON.stringify(order) };
};
