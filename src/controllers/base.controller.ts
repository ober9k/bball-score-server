import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function ok<T>(res: Response, data: T) {
  return res
    .status(StatusCodes.OK)
    .json(data);
}

export function created<T>(res: Response, data: T) {
  return res
    .status(StatusCodes.CREATED)
    .json(data);
}
