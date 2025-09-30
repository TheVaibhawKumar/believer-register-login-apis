import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "change_this_secret";
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
export const signJwt = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
};

export const verifyJwt = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
};
