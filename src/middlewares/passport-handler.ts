import { authTokenExtractor } from "@/lib/auth-token-extractor";
import { prisma } from "@/lib/prisma";
import { Strategy } from "passport-jwt";

let options = {
  jwtFromRequest: authTokenExtractor, /* alt: ExtractJwt.fromAuthHeaderAsBearerToken() */
  secretOrKey: process.env.JWT_SECRET_KEY,
};

/**
 * Not really a "middleware", however relocated here to reduce clutter in server.
 * @todo: find a more suitable naming structure and location
 */
export const passportHandler = new Strategy(options, async (jwt_payload, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: jwt_payload.id },
    }) as any;

    return done(null, {
      id:    user.id,
      email: user.email,
      role:  user.role,
    });
  }
  catch (error) {
    return done(error, false);
  }
});
