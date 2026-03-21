import type { RoleType } from "@/types/user/role";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const isAuthorizedRole = (roles: Array<RoleType>) => (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.user;

  if (!roles.map((r) => r.toUpperCase()).includes(role)) {
    return res.status(StatusCodes.FORBIDDEN).json({
      message: 'Not allowed.'
    });
  }

  next();
};
