import HistoryController from "../../controllers/history";
import Express from 'express';

const router: Express.Router = Express.Router();
const historyController = new HistoryController();

router.get('/:id', historyController.get);

export default router;
