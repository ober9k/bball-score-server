import { AuthCookieKey } from "@/lib/auth-token-extractor";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/services/auth.service";
import * as bcrypt from "bcryptjs";
import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: "error",
        msg: "No credentials",
        errors: [{msg: "No credentials"}]
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    }) as any;

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: 'error',
        msg: 'Invalid credentials',
        errors: [{ msg: "Invalid credentials" }]
      });
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
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      error: error.message,
      msg: "Internal server error."
    });
  }
}

export async function logout(req: Request, res: Response) {
  // ideally, the token should be cleared too?
  if (req.cookies[AuthCookieKey]) {
    res
      .clearCookie(AuthCookieKey)
      .status(200)
      .json({
        message: "You have logged out"
      })
  }

  res.status(StatusCodes.UNAUTHORIZED).json({
    error: "Invalid token"
  });
}
