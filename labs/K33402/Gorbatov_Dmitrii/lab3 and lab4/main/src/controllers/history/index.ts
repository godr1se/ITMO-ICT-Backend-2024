import HistoryService from "../../service/history";
import { Request, Response } from 'express';

class HistoryController {
    private historyService: HistoryService;

    constructor() {
        this.historyService = new HistoryService();
    }

    get = async (req: Request, res: Response) => {
        try {
            const result = await this.historyService.getById(Number(req.params.id));
            if (result === null) {
                res.status(404).send('History record not found');
                return;
            }
            res.status(200).send(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            console.log(errorMessage);
            res.status(400).send({ error: errorMessage });
        }
    };
}

export default HistoryController;
