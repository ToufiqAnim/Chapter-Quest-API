import jwt, { JwtPayload as JwtPayload, Secret } from "jsonwebtoken";
import config from "../config";

const createtoken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHeplers = {
  createtoken,
  verifyToken,
};
