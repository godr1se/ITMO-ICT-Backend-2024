import { Request, Response } from "express";
import UserService from "../../service/users";
import * as amqp from "amqplib";

class UserController {
  private userService: UserService;
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor() {
    this.userService = new UserService();
    this.initRabbitMQ();
  }

  private async initRabbitMQ() {
    this.connection = await amqp.connect("amqp://rabbitmq:5672");
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue("users_queue", { durable: true });
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAll();
      res.status(200).send(users);
      this.sendMessageToRabbitMQ("getAll", users);
    } catch (err) {
      console.error(err);
      res.status(400).send({ error: "Failed to retrieve users" });
    }
  };

  getId = async (req: Request, res: Response) => {
    try {
      const id: number = Number(req.params.id);
      const result = await this.userService.getById(id);
      if (!result) {
        return res.status(404).send(`User not found`);
      }
      res.status(200).send(result);
      this.sendMessageToRabbitMQ("getId", result);
    } catch (err) {
      console.error(err);
      res.status(400).send({ error: "Failed to retrieve user" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).send(user);
      this.sendMessageToRabbitMQ("create", user);
    } catch (err) {
      console.error(err);
      res.status(400).send({ error: "Failed to create user" });
    }
  };

  updatePas = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      const user = await this.userService.updatePassword(userId, req.body);
      if (!user) {
        return res.status(404).send(`User not found`);
      }
      res.status(200).send(user);
      this.sendMessageToRabbitMQ("updatePas", user);
    } catch (err) {
      console.error(err);
      res.status(400).send({ error: "Failed to update password" });
    }
  };

  updateEmail = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      const user = await this.userService.updateEmail(userId, req.body);
      if (!user) {
        return res.status(404).send(`User not found`);
      }
      res.status(200).send(user);
      this.sendMessageToRabbitMQ("updateEmail", user);
    } catch (err) {
      console.error(err);
      res.status(400).send({ error: "Failed to update email" });
    }
  };

  private sendMessageToRabbitMQ(action: string, data: any) {
    const message = { action, data };
    this.channel.sendToQueue(
      "users_queue",
      Buffer.from(JSON.stringify(message))
    );
  }

  getCurrentUser(req: any, res: Response) {
    res.setHeader("User-Id", req.headers["userId"]);
    res.sendStatus(200);
  }
}

export default UserController;
