import { NextFunction, Request, Response } from "express";
import { NotFoundException } from "../../exeptions/not-found";
import { ErrorCodes } from "../../exeptions/root";

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (!user)
    next(new NotFoundException("User not found", ErrorCodes.USER_NOT_FOUND));

  return res.status(200).json(user);
};

export default { getCurrentUser };
