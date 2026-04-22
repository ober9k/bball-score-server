import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function validateIdHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ code: StatusCodes.BAD_REQUEST, message: "Provided `id` must be an integer." });
  }

  next();
}
