import HttpException, { isHttpException } from "@/models/http-exception.model";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { type NextFunction, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * Borrowed with adjustments, see:
 * https://github.com/gothinkster/node-express-realworld-example-app/
 */
export function errorHandler(
  err: Error | HttpException | PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (isHttpException(err)) {
    const { errCode: code, message } = err;

    // work with the custom handler
    switch (err.errorCode) {
      case StatusCodes.NOT_FOUND:
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ code, message });
      default:
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ code, message });
    }
  }
  else if (err instanceof PrismaClientKnownRequestError) {
    const { code, message } = err;

    /* just throw it to the console */
    console.error("ERROR", code, message);

    /* work with the custom handler for prisma errors */
    switch (code) {
      /* TODO: add connection cases too */
      case "P2002":
        return res
          .status(StatusCodes.CONFLICT)
          .json({ code, message: "Unique constraint failed." });
      case "P2025":
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ code, message: "An operation failed because it depends on one or more records that were required but not found." });
      default:
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ code, message: "An unexpected error occurred." });
    }
  }

  // default fall back handling
  console.error(err);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(err.message);
}
