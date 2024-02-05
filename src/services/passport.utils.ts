import { Response, Request } from "express";
import passport from "passport";
import { OUser, IUser, DUser } from "../dto/user.dto";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import userRepo from "../repository/user.repo";
import logger from "../utils/logger";
import { BadRequest } from "../exeptions/bad-request";
import { ErrorCodes } from "../exeptions/root";
import { ILogin } from "../dto/login.dto";
import { jwtToken } from "../utils/jwt";

export const usePassportStrategies = async (
  req: Request,
  res: Response,
  strategy: string,
) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      strategy,
      { session: true },
      async (err: Error, user: OUser) => {
        if (err) {
          return reject(err);
        }

        return resolve(user);
      },
    )(req, res);
  });
};

export const signupPassport = async (
  { email, password, ...restBody }: IUser,
  next: any,
) => {
  const userToCreate = {
    ...restBody,
    password: await hashPassword(password),
    email: email.toLowerCase(),
  };

  const duplicate = await userRepo.findByQuery({ email });
  try {
    if (duplicate)
      next(
        new BadRequest("User already exist", ErrorCodes.USER_ALREADY_EXISTS),
      );

    const user = await userRepo.createUser(userToCreate);

    if (!user)
      next(new BadRequest("Cannot create user", ErrorCodes.BAD_REQUEST));

    next(null, user);
  } catch (err: any) {
    next(null, err);
  }
};

export const loginPassport = async ({ email, password }: ILogin, next: any) => {
  const user: DUser = (await userRepo.findByQuery({ email })) as DUser;

  try {
    if (!user)
      next(new BadRequest("User not found", ErrorCodes.USER_NOT_FOUND));

    const compare = await comparePassword(user?.password, password);

    if (!compare)
      next(new BadRequest("Password invalid", ErrorCodes.BAD_REQUEST));

    const jwt = jwtToken(user);
    next(null, jwt);
  } catch (err: any) {
    next(null, err);
  }
};
