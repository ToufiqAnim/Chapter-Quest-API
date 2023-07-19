import { RequestHandler, Request, Response, NextFunction } from "express";

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next); // Await the fn call
    } catch (error) {
      next(error);
    }
  };
};
