import Express from "express";
import CurrencyController from "../../controllers/currency";

const router: Express.Router = Express.Router();

const currencyController = new CurrencyController();

router.route('/')
    .get(currencyController.get)
    .post(currencyController.create);

router.get('/:id', currencyController.getId);
router.get('/price/:id', currencyController.getPrice);
router.post('/update', currencyController.update);


export default router;
