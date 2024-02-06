import { Router } from "express";
import userController from "./user.controller";
import { errorHandler } from "../../helpers/erros-handler";
import { authMiddleware } from "../../middlewares/authorization";

const router: Router = Router();

router.get(
  "/me",
  [authMiddleware],
  errorHandler(userController.getCurrentUser),
);

export default router;
