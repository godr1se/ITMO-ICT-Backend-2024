import Express, { NextFunction, Request, Response } from "express";
import amqp from 'amqplib';
import currencyRoute from './currency';
import balanceRoute from './balance';
import historyRoute from './history';

const rabbitUrl = "amqp://rabbitmq:5672";
const queueName = "auth_queue";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();

    interface CustomRequest extends Request {
        user: any;
    }

    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ "error": 'Missing token' });
    }

    const message = { token };
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));

    const result = await channel.get(queueName);

    if (!result || !result.content) {
        return res.status(401).send({ "error": 'Authentication failed' });
    }

    const userData = JSON.parse(result.content.toString());
    (req as CustomRequest).user = userData;
    next();
};


const router: Express.Router = Express.Router();

router.use('/balance', balanceRoute);
router.use('/history', historyRoute);
router.use('/currency', currencyRoute);

export default router;
