import Express from "express";
import UserController from "../../controllers/user/userController";

const router: Express.Router = Express.Router();
const userController = new UserController();

router.route("/").get(userController.getAll).post(userController.create);

router
  .route("/find/:id")
  .get(userController.getId)
  .post(userController.updatePas);
router.route("/current").get(userController.getCurrentUser);
export default router;
