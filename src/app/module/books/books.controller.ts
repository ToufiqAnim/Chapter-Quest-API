import { RequestHandler } from "express";
import { BookService } from "./books.service";
import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constant";
import { sendResponse } from "../../../shared/sendResonse";
import httpStatus from "http-status";
import { IBook } from "./books.interface";
import { catchAsync } from "../../../shared/catchAsync";

const AddBook: RequestHandler = async (req, res, next) => {
  if (!req.user || !req.body) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const book = req.body;
  const user = req.user;
  const result = await BookService.AddBooks(book, user);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books Created successfully",
    data: result,
  });
};
const GetAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const result = await BookService.GetAllBooks(filters);
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});
const GetSingleBook: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const result = await BookService.GetSingleBook(id);
  res.status(200).json({
    success: true,
    message: "Book retrieved successfully!",
    data: result,
  });
};
const UpdateBook: RequestHandler = async (req, res, next) => {
  if (!req.user || !req.body) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const id = req.params.id;
  const user = req.user;
  const updatedData = req.body;
  const result = await BookService.UpdateBook(id, user, updatedData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
};
const DeleteBook: RequestHandler = async (req, res, next) => {
  if (!req.user || !req.body) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const id = req.params.id;
  const user = req.user;
  const result = await BookService.DeleteBook(id, user);

  res.status(200).json({
    success: true,
    message: "Selected Book deleted successfully!",
    data: result,
  });
};
export const BookController = {
  AddBook,
  GetAllBooks,
  GetSingleBook,
  UpdateBook,
  DeleteBook,
};
