import Express from "express";
import AuthController from '../../controllers/auth';

const router: Express.Router = Express.Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/auth', authController.auth);

export default router;
