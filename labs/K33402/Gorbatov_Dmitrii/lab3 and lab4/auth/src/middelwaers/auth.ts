import amqp from "amqplib";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import UserService from "../service/users";
import { Request, Response, NextFunction } from "express";

const rabbitUrl = "amqp://rabbitmq:5672";
const queueName = "auth_queue";
const SECRET_KEY = "TEST_MARKET_FOR_LESSON";
export interface CustomRequest extends Request {
  user: number;
}

async function start() {
  try {
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    channel.consume(queueName, async (msg) => {
      if (msg !== null) {
        try {
          const SECRET_KEY: Secret = "TEST_MARKET_FOR_LESSON";
          const userService = new UserService();

          const message = JSON.parse(msg.content.toString());
          const token = message.token;

          if (!token) {
            throw new Error("Token is missing");
          }

          const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
          const userData = await userService.getIdWithPassword(decoded.id);

          if (!userData) {
            throw new Error("User not found");
          }

          channel.sendToQueue(queueName, Buffer.from(JSON.stringify(userData)));
        } catch (err) {
          console.error(err);
          channel.sendToQueue(
            queueName,
            Buffer.from(JSON.stringify({ error: "Authentication failed" }))
          );
        } finally {
          channel.ack(msg);
        }
      }
    });
  } catch (err) {
    console.error("Error connecting to RabbitMQ:", err);
  }
}
export const getId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Missing token");
    }

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    (req as CustomRequest).user = decoded.id;
    req.headers["userId"] = decoded.id;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate" });
  }
};
start();
