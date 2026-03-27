import HttpException, { isHttpException } from "@/models/http-exception.model";
import { type NextFunction, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Borrowed with adjustments, see:
 * https://github.com/gothinkster/node-express-realworld-example-app/
 */
export function errorHandler(
  err: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (isHttpException(err)) {
    // work with the custom handler
    switch (err.errorCode) {
      case StatusCodes.NOT_FOUND:
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({
            code: err.errorCode,
            message: err.message,
          });
      default:
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({
            code: err.errorCode,
            message: err.message,
          });
    }
  }

  // default fall back handling
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(err.message);
}
