import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exeptions/root";

export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.statusCode).json({
    message: err.message,
    errorCode: err.errorCode,
    errors: err.errors,
  });
};
