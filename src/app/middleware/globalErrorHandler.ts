import { ErrorRequestHandler } from "express";
import { IGenericErrorMessage } from "../../interfaces/error";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Somethng went wrong!!!";
  let errorMessages: IGenericErrorMessage[] = [];
};
export default globalErrorHandler;
