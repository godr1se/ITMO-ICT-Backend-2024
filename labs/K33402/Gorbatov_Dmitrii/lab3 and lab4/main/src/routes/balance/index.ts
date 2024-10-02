import Express from "express";
import BalanceController from "../../controllers/balance";

const router: Express.Router = Express.Router();

const balanceController = new BalanceController();

router.route('/')
    .get(balanceController.get)
    .post(balanceController.create);

router.route('/:id')
    .get(balanceController.getById)
    .post(balanceController.update);

router.get('/user/:id', balanceController.getByUserId);

export default router;
