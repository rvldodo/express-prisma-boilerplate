import { Request, Response, NextFunction } from "express";
import { usePassportStrategies } from "../../services/passport.utils";
import logger from "../../utils/logger";
import { BadRequest } from "../../exeptions/bad-request";
import { UnprocessableEntity } from "../../exeptions/validation";
import { ErrorCodes, HttpException } from "../../exeptions/root";
import { LoginSchema, SignupSchema } from "../../schema/user";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  SignupSchema.parse(req?.body);
  const user = await usePassportStrategies(req, res, "signup");
  if (user instanceof BadRequest)
    new BadRequest("Problem create user", ErrorCodes.BAD_REQUEST);

  return res.status(201).json({ data: user });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  LoginSchema.parse(req?.body);
  const token = await usePassportStrategies(req, res, "login");
  if (token instanceof HttpException)
    new BadRequest("Login failed", ErrorCodes.BAD_REQUEST);

  return res.status(200).json({ token });
};

export default { signup, login };
