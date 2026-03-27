import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export function validationHandler(schema: z.ZodTypeAny) {
  return function (
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      schema.parse(req.body);
      next();
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({
            message: "Validation Failed.",
            errors: z.flattenError(error),
          });
      }

      next(error);
    }
  }
}
