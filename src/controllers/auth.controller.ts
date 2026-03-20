import { AuthCookieKey } from "@/lib/auth-token-extractor";
import { generateToken } from "@/services/auth.service";
import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

export const TestId = 1;
export const TestEmail = "john.smith@example.com";
export const TestPassword = "john.smith.2026";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = (req.method === "GET")
      ? { email: TestEmail, password: TestPassword }
      : req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "error",
        msg: "No credentials",
        errors: [{msg: "No credentials"}]
      });
    }

    // initially use fixed values */
    if (email !== TestEmail && password !== TestPassword) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: "error",
        msg: "Invalid credentials",
        errors: [{msg: "Invalid credentials"}]
      });
    }

    // generate user token
    const token = generateToken({id: TestId});
    res.cookie(AuthCookieKey, token, {httpOnly: true});

    return res.status(StatusCodes.OK).json({
      status: "success",
      msg: "Logged in successfully.",
      user: {
        id: TestId,
        email,
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
};

export const logout = async (req: Request, res: Response) => {
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
};