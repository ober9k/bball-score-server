import jwt from "jsonwebtoken";

export const generateToken = ({ id }: { id: number }): string => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const expiresIn = process.env.JWT_EXPIRATION_TIME;

  return jwt.sign({ id }, secretKey, { expiresIn });
}
