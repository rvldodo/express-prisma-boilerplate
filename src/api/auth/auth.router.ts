import { Router } from "express";
import authController from "./auth.controller";
import { errorHandler } from "../../helpers/erros-handler";

const router: Router = Router();

router.post("/signup", errorHandler(authController.signup));
router.post("/login", errorHandler(authController.login));

export default router;
