import { Router } from "express";
import authRouter from "./auth/auth.router";
import users from "./users/user.router";

const router: Router = Router();

router.use("/auth", authRouter);
router.use("/users", users);

export default router;
