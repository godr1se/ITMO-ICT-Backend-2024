import Express from "express";
import userRout from "./user";
import authRout from "./auth";
import { getId } from "../middelwaers/auth";
const router: Express.Router = Express.Router();

router.use("/users", getId, userRout);
router.use("/auth", authRout);

export default router;
