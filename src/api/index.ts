import { Router } from "express";
import authRouter from "./auth/auth.router";

const router: Router = Router();

router.use("/auth", authRouter);

export default router;
