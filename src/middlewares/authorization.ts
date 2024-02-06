import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { UnauthorizedException } from "../exeptions/unauthorized";
import { ErrorCodes } from "../exeptions/root";
import { Payload, decodeToken } from "../utils/jwt";
import userRepo from "../repository/user.repo";
import { TUser } from "../types/users.type";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization;
    if (!token)
      next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));

    const payload: Payload = await decodeToken(token);

    const user: TUser = (await userRepo.findByQuery({
      email: payload?.email,
    })) as TUser;
    if (!user)
      next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));

    req.user = user;
    next();
  } catch (err) {
    logger.error(err);
    next(new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED));
  }
};
