import type { Request } from "express";

export const AuthCookieKey = "token";

/**
 * Retrieve the special (httpOnly) auth cookie.
 * @param req
 */
export const authTokenExtractor = (req: Request) => {
  return (req && req.cookies)
    ? req.cookies[AuthCookieKey]
    : null;
};
