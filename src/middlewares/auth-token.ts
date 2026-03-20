import passport from "passport";
import { type Request, type Response, type NextFunction } from "express";

/**
 * Initial error messages... (to be re-worked).
 */
const Messages = {
  ServerError: "Internal server error.",
  TokenExpired: "Token expired, please log in again.",
  TokenNotFound: "Token not provided.",
  TokenInvalid: "Token not valid.",
} as const;

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

  passport.authenticate('jwt', { session: false }, (err, user, info) => {

    if (err) {
      return res.status(500).json({ message: Messages.ServerError });
    }

    if (!user) {
      if (info?.name === 'TokenExpiredError') {
        return res.status(401).json({ message: Messages.TokenExpired });
      }

      if (info?.message === 'No auth token') {
        return res.status(401).json({ message: Messages.TokenNotFound });
      }

      return res.status(401).json({ message: Messages.TokenInvalid });
    }

    req.user = user;
    next();

  })(req, res, next);

};

export const isAuthenticated = authenticateToken;
