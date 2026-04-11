import { AuthCookieKey } from "@/lib/auth-token-extractor";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/services/auth.service";
import * as bcrypt from "bcryptjs";
import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

function buildJsonSuccess(status: number, message: string) {
  return {
    status,
    message,
  };
}

function buildJsonError(status: number, message: string, formErrors: string[]) {
  return {
    status,
    message,
    formErrors,
  };
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json(
          buildJsonError(StatusCodes.UNAUTHORIZED, "Error", ["Please fill in all required fields."])
        );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    }) as any;

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json(
          buildJsonError(StatusCodes.UNAUTHORIZED, "Error", ["Please enter the correct email address and password combination."])
        );
    }

    // generate user token
    const token = generateToken({ id: user.id });
    res.cookie(AuthCookieKey, token, {httpOnly: true});

    return res.status(StatusCodes.OK).json({
      status: "success",
      msg: "Logged in successfully.",
      user: {
        id:    user.id,
        email: user.email,
        role:  user.role,
        token,
      }
    });
  }
  catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        buildJsonError(StatusCodes.INTERNAL_SERVER_ERROR, "Error", ["Internal server error."])
      );
  }
}

export async function logout(req: Request, res: Response) {
  // ideally, the token should be cleared too?
  if (req.cookies[AuthCookieKey]) {
    return res
      .clearCookie(AuthCookieKey)
      .status(StatusCodes.OK)
      .json(
        buildJsonSuccess(StatusCodes.OK, "Successfully logged out.")
      );
  }

  return res
    .status(StatusCodes.UNAUTHORIZED)
    .json(
      buildJsonError(StatusCodes.UNAUTHORIZED, "Error", ["Invalid token provided."])
    );
}

export async function me(req: Request, res: Response) {
  return res
    .status(StatusCodes.OK)
    .json(req.user);
}
