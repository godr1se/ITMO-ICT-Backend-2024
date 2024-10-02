import { Request, Response } from "express";
import CurrencyService from "../../service/currency";

export default class CurrencyController {
    private currencyService: CurrencyService;

    constructor() {
        this.currencyService = new CurrencyService();
    }

    get = async (req: Request, res: Response) => {
        try {
            const product = await this.currencyService.getAll();
            res.status(200).send(product);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            console.log(errorMessage);
            res.status(400).send({ error: errorMessage });
        }
    };

    getId = async (req: Request, res: Response) => {
        try {
            const id: number = Number(req.params.id);
            const result = await this.currencyService.getById(id);
            if (result === null) {
                res.status(404).send('Product not found');
                return;
            }
            res.status(200).send(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            console.log(errorMessage);
            res.status(400).send({ error: errorMessage });
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const product = await this.currencyService.createCurrency(req.body);
            res.status(201).send(product);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            console.log(errorMessage);
            res.status(400).send({ error: errorMessage });
        }
    };

    getPrice = async (req: Request, res: Response) => {
        try {
            const id: number = Number(req.params.id);
            const result = await this.currencyService.getById(id);
            if (result === null) {
                res.status(404).send('Product not found');
                return;
            }
            res.status(200).send({ price: result.price });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            console.log(errorMessage);
            res.status(400).send({ error: errorMessage });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const id: number = Number(req.body.id);
            const result = await this.currencyService.updatePrice(id, req.body.price);
            res.status(200).send(`Updated successfully: \n ${result}`);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            res.status(400).send({ error: errorMessage });
        }
    };
}
