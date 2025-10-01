import jwt, { Secret, SignOptions } from "jsonwebtoken";
import ms from "ms"; // comes with types for StringValue

const SECRET: Secret = process.env.JWT_SECRET || "change_this_secret";
const EXPIRES_IN: ms.StringValue = (process.env.JWT_EXPIRES_IN as ms.StringValue) || "1h";

export const signJwt = (payload: object): string => {
  const options: SignOptions = { expiresIn: EXPIRES_IN };
  return jwt.sign(payload, SECRET, options);
};

export const verifyJwt = (token: string): object | null => {
  try {
    return jwt.verify(token, SECRET) as object;
  } catch {
    return null;
  }
};
