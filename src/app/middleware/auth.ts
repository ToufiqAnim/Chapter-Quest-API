import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { NextFunction, Request, Response } from "express";

import config from "../../config";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    try {
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorization Access!");
      }

      //verify token
      let verifiedUser = null;
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Authentication Required!!");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
export default auth;
