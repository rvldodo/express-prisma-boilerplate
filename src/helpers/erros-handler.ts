import { Request, Response, NextFunction } from "express";
import { ErrorCodes, HttpException } from "../exeptions/root";
import { InternalException } from "../exeptions/internal-exception";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (err: any) {
      console.log(err);
      let exception: HttpException;
      if (err instanceof HttpException) exception = err;
      else
        exception = new InternalException(
          err?.issues
            ? "Validation error"
            : err?.message || "Something went wrong",
          err,
          ErrorCodes.INTERNAL_EXCEPTION,
        );
      next(exception);
    }
  };
};
