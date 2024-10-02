import BalanceService from "../../service/balance";
import { Request, Response } from "express";

export default class BalanceController {
  private balanceService: BalanceService;

  constructor() {
    this.balanceService = new BalanceService();
  }

  get = async (req: Request, res: Response) => {
    try {
      const result = await this.balanceService.getAll();
      res.status(200).send(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      res.status(400).send({ error: errorMessage });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const result = await this.balanceService.getById(Number(req.params.id));
      res.status(200).send(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      res.status(400).send({ error: errorMessage });
    }
  };

  getByUserId = async (req: Request, res: Response) => {
    try {
      const result = await this.balanceService.getByUserId(
        Number(req.params.id)
      );
      res.status(200).send(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      res.status(400).send({ error: errorMessage });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const userid = req.headers["user-id"];
      console.log(userid, typeof userid);
      const result = await this.balanceService.create(
        Number(userid),
        req.body.currencyId,
        req.body
      );
      res.status(201).send({ result });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      res.status(400).send({ error: errorMessage });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const result = await this.balanceService.update(
        Number(req.params.id),
        req.body.product
      );
      res.status(200).send(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      res.status(400).send({ error: errorMessage });
    }
  };
}
